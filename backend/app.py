from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from functools import wraps

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Secret key for JWT
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')

# MongoDB connection
# Note: In production, use environment variables for the connection string
MONGO_URI = 'mongodb://localhost:27017/finfine'
try:
    # client = pymongo.MongoClient("mongodb://127.0.0.1:27017");
    client = pymongo.MongoClient("mongodb://localhost:27017")


    db = client.finfine  # Database name
    users_collection = db.users  # Collection name
    accounts_collection = db.accounts
    transactions_collection = db.transactions
    budgets_collection = db.budgets
    goals_collection = db.goals
    settings_collection = db.settings  # New collection for user settings
    print("Connected to MongoDB")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Create unique index on email field
users_collection.create_index("email", unique=True)

# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, app.config.get('SECRET_KEY'), algorithms=['HS256'])
            user_id = payload['sub']
            
            current_user = users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not current_user:
                return jsonify({'message': 'User not found'}), 404
        
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'message': f'Invalid token: {str(e)}'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated

# Helper function to generate JWT token
def generate_token(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': str(user_id)
    }
    return jwt.encode(
        payload,
        app.config.get('SECRET_KEY'),
        algorithm='HS256'
    )

# Registration route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input fields
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing required fields'}), 400
        
    # Check if user already exists
    if users_collection.find_one({'email': data['email']}):
        return jsonify({'message': 'User already exists'}), 409
    
    # Create new user
    hashed_password = generate_password_hash(data['password'])
    
    new_user = {
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'role': 'Standard User',
        'avatar': data['name'][:2].upper(),
        'created_at': datetime.datetime.utcnow()
    }
    
    try:
        result = users_collection.insert_one(new_user)
        user_id = result.inserted_id
        
        # Create default account for the user
        default_account = {
            'user_id': user_id,
            'name': 'Cash Account',
            'type': 'Cash',
            'balance': 1000.00,
            'currency': 'USD',
            'created_at': datetime.datetime.utcnow()
        }
        accounts_collection.insert_one(default_account)
        
        # Create default settings for the user
        default_settings = {
            'user_id': user_id,
            'theme': 'light',
            'currency': 'USD',
            'language': 'English',
            'notifications': {
                'email': True,
                'push': True,
                'budget_alerts': True,
                'transaction_alerts': True,
                'goal_reminders': True,
                'investment_opportunities': False,
                'monthly_reports': True
            },
            'privacy': {
                'share_analytics': False,
                'two_factor_auth': False,
                'third_party_integrations': False,
                'public_profile': False
            },
            'dashboard': {
                'show_accounts': True,
                'show_transactions': True,
                'show_budgets': True,
                'show_goals': True,
                'compact_view': False
            },
            'created_at': datetime.datetime.utcnow(),
            'updated_at': datetime.datetime.utcnow()
        }
        settings_collection.insert_one(default_settings)
        
        # Generate token
        token = generate_token(str(user_id))
        
        # Return user info and token
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': str(user_id),
                'name': data['name'],
                'email': data['email'],
                'avatar': new_user['avatar'],
                'role': new_user['role']
            }
        }), 201
    except Exception as e:
        return jsonify({'message': f'Error creating user: {str(e)}'}), 500

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    # Find user by email
    user = users_collection.find_one({'email': data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Generate token
    token = generate_token(str(user['_id']))
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'avatar': user['avatar'],
            'role': user['role']
        }
    }), 200

# Verify token and get user
@app.route('/api/user', methods=['GET'])
def get_user():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return jsonify({'message': 'Token is missing'}), 401
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, app.config.get('SECRET_KEY'), algorithms=['HS256'])
        user_id = payload['sub']
        
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        return jsonify({
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'avatar': user['avatar'],
                'role': user['role']
            }
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except (jwt.InvalidTokenError, Exception) as e:
        return jsonify({'message': f'Invalid token: {str(e)}'}), 401

# Settings API routes
@app.route('/api/settings', methods=['GET'])
@token_required
def get_settings(current_user):
    user_id = current_user['_id']
    
    # Get user settings
    settings = settings_collection.find_one({'user_id': user_id})
    
    if not settings:
        # Create default settings if none exist
        default_settings = {
            'user_id': user_id,
            'theme': 'light',
            'currency': 'USD',
            'language': 'English',
            'notifications': {
                'email': True,
                'push': True,
                'budget_alerts': True,
                'transaction_alerts': True,
                'goal_reminders': True,
                'investment_opportunities': False,
                'monthly_reports': True
            },
            'privacy': {
                'share_analytics': False,
                'two_factor_auth': False,
                'third_party_integrations': False,
                'public_profile': False
            },
            'dashboard': {
                'show_accounts': True,
                'show_transactions': True,
                'show_budgets': True,
                'show_goals': True,
                'compact_view': False
            },
            'created_at': datetime.datetime.utcnow(),
            'updated_at': datetime.datetime.utcnow()
        }
        
        # Insert default settings
        settings_collection.insert_one(default_settings)
        settings = default_settings
    
    # Format the response
    settings_response = {
        'id': str(settings.get('_id', '')),
        'theme': settings.get('theme', 'light'),
        'currency': settings.get('currency', 'USD'),
        'language': settings.get('language', 'English'),
        'notifications': settings.get('notifications', {}),
        'privacy': settings.get('privacy', {}),
        'dashboard': settings.get('dashboard', {}),
        'created_at': settings.get('created_at', datetime.datetime.utcnow()).isoformat(),
        'updated_at': settings.get('updated_at', datetime.datetime.utcnow()).isoformat()
    }
    
    return jsonify(settings_response), 200

@app.route('/api/settings/theme', methods=['PUT'])
@token_required
def update_theme(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    if not data or 'theme' not in data:
        return jsonify({'message': 'Theme is required'}), 400
    
    theme = data['theme']
    if theme not in ['light', 'dark', 'system']:
        return jsonify({'message': 'Invalid theme value. Must be "light", "dark", or "system"'}), 400
    
    # Update the theme setting
    result = settings_collection.update_one(
        {'user_id': user_id},
        {'$set': {
            'theme': theme,
            'updated_at': datetime.datetime.utcnow()
        }},
        upsert=True
    )
    
    if result.modified_count > 0 or result.upserted_id:
        return jsonify({'message': 'Theme updated successfully', 'theme': theme}), 200
    else:
        return jsonify({'message': 'No changes made to theme'}), 304

@app.route('/api/settings/currency', methods=['PUT'])
@token_required
def update_currency(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    if not data or 'currency' not in data:
        return jsonify({'message': 'Currency is required'}), 400
    
    currency = data['currency']
    # You could add validation for valid currency codes here
    
    # Update the currency setting
    result = settings_collection.update_one(
        {'user_id': user_id},
        {'$set': {
            'currency': currency,
            'updated_at': datetime.datetime.utcnow()
        }},
        upsert=True
    )
    
    if result.modified_count > 0 or result.upserted_id:
        return jsonify({'message': 'Currency updated successfully', 'currency': currency}), 200
    else:
        return jsonify({'message': 'No changes made to currency'}), 304

@app.route('/api/settings/language', methods=['PUT'])
@token_required
def update_language(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    if not data or 'language' not in data:
        return jsonify({'message': 'Language is required'}), 400
    
    language = data['language']
    # You could add validation for valid language codes here
    
    # Update the language setting
    result = settings_collection.update_one(
        {'user_id': user_id},
        {'$set': {
            'language': language,
            'updated_at': datetime.datetime.utcnow()
        }},
        upsert=True
    )
    
    if result.modified_count > 0 or result.upserted_id:
        return jsonify({'message': 'Language updated successfully', 'language': language}), 200
    else:
        return jsonify({'message': 'No changes made to language'}), 304

@app.route('/api/settings/notifications', methods=['PUT'])
@token_required
def update_notifications(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    # Validate input
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Validate that at least one notification setting is provided
    valid_fields = [
        'email', 'push', 'budget_alerts', 'transaction_alerts', 'goal_reminders',
        'investment_opportunities', 'monthly_reports',
        # Frontend UI field mappings
        'goalReminders', 'budgetAlerts', 'investmentOpportunities', 'monthlyReports'
    ]
    
    if not any(field in data for field in valid_fields):
        return jsonify({'message': 'At least one valid notification setting must be provided'}), 400
    
    # Get current settings
    settings = settings_collection.find_one({'user_id': user_id})
    
    if not settings:
        return jsonify({'message': 'Settings not found'}), 404
    
    # Get current notification settings
    current_notifications = settings.get('notifications', {})
    
    # Handle UI field mappings to backend fields
    field_mappings = {
        'goalReminders': 'goal_reminders',
        'budgetAlerts': 'budget_alerts',
        'investmentOpportunities': 'investment_opportunities',
        'monthlyReports': 'monthly_reports'
    }
    
    # Update notification settings
    updates = {}
    for key, value in data.items():
        if key in valid_fields:
            backend_key = field_mappings.get(key, key)  # Use mapping if exists, otherwise use original key
            updates[f'notifications.{backend_key}'] = bool(value)
    
    # Update timestamp
    updates['updated_at'] = datetime.datetime.utcnow()
    
    try:
        # Update settings in the database
        result = settings_collection.update_one(
            {'user_id': user_id},
            {'$set': updates}
        )
        
        if result.modified_count == 0:
            return jsonify({'message': 'No changes made'}), 200
            
        # Get updated settings
        updated_settings = settings_collection.find_one({'user_id': user_id})
        
        return jsonify({
            'message': 'Notification settings updated successfully',
            'notifications': updated_settings.get('notifications', {})
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error updating notification settings: {str(e)}'}), 500

@app.route('/api/settings/privacy', methods=['PUT'])
@token_required
def update_privacy(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    # Validate input
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Validate that at least one privacy setting is provided
    valid_fields = [
        'share_analytics', 'two_factor_auth', 'third_party_integrations', 'public_profile',
        # Frontend UI field mappings
        'analyticsSharing', 'twoFactorAuth', 'thirdPartyIntegrations', 'publicProfile'
    ]
    
    if not any(field in data for field in valid_fields):
        return jsonify({'message': 'At least one valid privacy setting must be provided'}), 400
    
    # Get current settings
    settings = settings_collection.find_one({'user_id': user_id})
    
    if not settings:
        return jsonify({'message': 'Settings not found'}), 404
    
    # Get current privacy settings
    current_privacy = settings.get('privacy', {})
    
    # Handle UI field mappings to backend fields
    field_mappings = {
        'analyticsSharing': 'share_analytics',
        'twoFactorAuth': 'two_factor_auth',
        'thirdPartyIntegrations': 'third_party_integrations',
        'publicProfile': 'public_profile'
    }
    
    # Update privacy settings
    updates = {}
    for key, value in data.items():
        if key in valid_fields:
            backend_key = field_mappings.get(key, key)  # Use mapping if exists, otherwise use original key
            updates[f'privacy.{backend_key}'] = bool(value)
    
    # Update timestamp
    updates['updated_at'] = datetime.datetime.utcnow()
    
    try:
        # Update settings in the database
        result = settings_collection.update_one(
            {'user_id': user_id},
            {'$set': updates}
        )
        
        if result.modified_count == 0:
            return jsonify({'message': 'No changes made'}), 200
            
        # Get updated settings
        updated_settings = settings_collection.find_one({'user_id': user_id})
        
        return jsonify({
            'message': 'Privacy settings updated successfully',
            'privacy': updated_settings.get('privacy', {})
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error updating privacy settings: {str(e)}'}), 500

@app.route('/api/settings/dashboard', methods=['PUT'])
@token_required
def update_dashboard(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    # Validate input
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    # Get current settings
    settings = settings_collection.find_one({'user_id': user_id})
    
    if not settings:
        return jsonify({'message': 'Settings not found'}), 404
    
    # Get current dashboard settings
    current_dashboard = settings.get('dashboard', {})
    
    # Update dashboard settings
    updates = {}
    if 'show_accounts' in data:
        updates['dashboard.show_accounts'] = data['show_accounts']
    if 'show_transactions' in data:
        updates['dashboard.show_transactions'] = data['show_transactions']
    if 'show_budgets' in data:
        updates['dashboard.show_budgets'] = data['show_budgets']
    if 'show_goals' in data:
        updates['dashboard.show_goals'] = data['show_goals']
    if 'compact_view' in data:
        updates['dashboard.compact_view'] = data['compact_view']
    
    # Update timestamp
    updates['updated_at'] = datetime.datetime.utcnow()
    
    try:
        # Update settings in the database
        result = settings_collection.update_one(
            {'user_id': user_id},
            {'$set': updates}
        )
        
        if result.modified_count == 0:
            return jsonify({'message': 'No changes made'}), 200
            
        # Get updated settings
        updated_settings = settings_collection.find_one({'user_id': user_id})
        
        return jsonify({
            'message': 'Dashboard settings updated successfully',
            'dashboard': updated_settings.get('dashboard', {})
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error updating dashboard settings: {str(e)}'}), 500

@app.route('/api/settings/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    if not data:
        return jsonify({'message': 'No profile data provided'}), 400
    
    update_fields = {}
    
    # Only allow certain fields to be updated
    if 'name' in data and data['name']:
        update_fields['name'] = data['name']
        # Also update avatar based on name
        update_fields['avatar'] = data['name'][:2].upper()
    
    if not update_fields:
        return jsonify({'message': 'No valid profile fields to update'}), 400
    
    # Update the user profile
    result = users_collection.update_one(
        {'_id': user_id},
        {'$set': update_fields}
    )
    
    if result.modified_count > 0:
        # Get the updated user
        updated_user = users_collection.find_one({'_id': user_id})
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': {
                'id': str(updated_user['_id']),
                'name': updated_user['name'],
                'email': updated_user['email'],
                'avatar': updated_user['avatar'],
                'role': updated_user['role']
            }
        }), 200
    else:
        return jsonify({'message': 'No changes made to profile'}), 304

@app.route('/api/settings/password', methods=['PUT'])
@token_required
def update_password(current_user):
    user_id = current_user['_id']
    data = request.get_json()
    
    if not data or not data.get('current_password') or not data.get('new_password'):
        return jsonify({'message': 'Current password and new password are required'}), 400
    
    # Verify current password
    if not check_password_hash(current_user['password'], data['current_password']):
        return jsonify({'message': 'Current password is incorrect'}), 401
    
    # Password validation
    if len(data['new_password']) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long'}), 400
    
    # Update the password
    hashed_password = generate_password_hash(data['new_password'])
    
    result = users_collection.update_one(
        {'_id': user_id},
        {'$set': {'password': hashed_password}}
    )
    
    if result.modified_count > 0:
        return jsonify({'message': 'Password updated successfully'}), 200
    else:
        return jsonify({'message': 'No changes made to password'}), 304

# Dashboard API routes
@app.route('/api/dashboard/summary', methods=['GET'])
@token_required
def get_dashboard_summary(current_user):
    user_id = current_user['_id']
    
    # Get accounts
    accounts = list(accounts_collection.find({'user_id': user_id}))
    total_balance = sum(account.get('balance', 0) for account in accounts)
    
    # Get recent transactions
    recent_transactions = list(transactions_collection.find(
        {'user_id': user_id}
    ).sort('date', -1).limit(5))
    
    # Get budgets
    budgets = list(budgets_collection.find({'user_id': user_id}))
    total_budget = sum(budget.get('amount', 0) for budget in budgets)
    spent = sum(budget.get('spent', 0) for budget in budgets)
    
    # Get goals
    goals = list(goals_collection.find({'user_id': user_id}))
    goals_total = sum(goal.get('target_amount', 0) for goal in goals)
    goals_current = sum(goal.get('current_amount', 0) for goal in goals)
    
    # Format the data for the response
    formatted_accounts = [{
        'id': str(account['_id']),
        'name': account.get('name', ''),
        'type': account.get('type', ''),
        'balance': account.get('balance', 0),
        'currency': account.get('currency', 'USD')
    } for account in accounts]
    
    formatted_transactions = [{
        'id': str(transaction['_id']),
        'date': transaction.get('date', datetime.datetime.utcnow()).isoformat(),
        'description': transaction.get('description', ''),
        'amount': transaction.get('amount', 0),
        'category': transaction.get('category', 'Uncategorized'),
        'type': transaction.get('type', 'expense')
    } for transaction in recent_transactions]
    
    formatted_budgets = [{
        'id': str(budget['_id']),
        'category': budget.get('category', ''),
        'amount': budget.get('amount', 0),
        'spent': budget.get('spent', 0),
        'period': budget.get('period', 'monthly')
    } for budget in budgets]
    
    formatted_goals = [{
        'id': str(goal['_id']),
        'name': goal.get('name', ''),
        'target_amount': goal.get('target_amount', 0),
        'current_amount': goal.get('current_amount', 0),
        'deadline': goal.get('deadline', '').isoformat() if goal.get('deadline') else None,
        'priority': goal.get('priority', 'medium')
    } for goal in goals]
    
    # Create mock data if no data exists
    if not formatted_accounts:
        formatted_accounts = [
            {
                'id': 'mock-account-1',
                'name': 'Cash Account',
                'type': 'Cash',
                'balance': 1500,
                'currency': 'USD'
            },
            {
                'id': 'mock-account-2',
                'name': 'Savings Account',
                'type': 'Savings',
                'balance': 5000,
                'currency': 'USD'
            }
        ]
        total_balance = 6500
    
    if not formatted_transactions:
        formatted_transactions = [
            {
                'id': 'mock-tx-1',
                'date': datetime.datetime.utcnow().isoformat(),
                'description': 'Grocery shopping',
                'amount': 120.50,
                'category': 'Food',
                'type': 'expense'
            },
            {
                'id': 'mock-tx-2',
                'date': (datetime.datetime.utcnow() - datetime.timedelta(days=1)).isoformat(),
                'description': 'Salary',
                'amount': 3000.00,
                'category': 'Income',
                'type': 'income'
            },
            {
                'id': 'mock-tx-3',
                'date': (datetime.datetime.utcnow() - datetime.timedelta(days=2)).isoformat(),
                'description': 'Restaurant',
                'amount': 75.20,
                'category': 'Dining',
                'type': 'expense'
            }
        ]
    
    if not formatted_budgets:
        formatted_budgets = [
            {
                'id': 'mock-budget-1',
                'category': 'Food',
                'amount': 500,
                'spent': 320,
                'period': 'monthly'
            },
            {
                'id': 'mock-budget-2',
                'category': 'Entertainment',
                'amount': 200,
                'spent': 150,
                'period': 'monthly'
            },
            {
                'id': 'mock-budget-3',
                'category': 'Transportation',
                'amount': 300,
                'spent': 180,
                'period': 'monthly'
            }
        ]
        total_budget = 1000
        spent = 650
    
    if not formatted_goals:
        formatted_goals = [
            {
                'id': 'mock-goal-1',
                'name': 'Emergency Fund',
                'target_amount': 10000,
                'current_amount': 2500,
                'deadline': (datetime.datetime.utcnow() + datetime.timedelta(days=365)).isoformat(),
                'priority': 'high'
            },
            {
                'id': 'mock-goal-2',
                'name': 'Vacation',
                'target_amount': 3000,
                'current_amount': 1200,
                'deadline': (datetime.datetime.utcnow() + datetime.timedelta(days=180)).isoformat(),
                'priority': 'medium'
            }
        ]
        goals_total = 13000
        goals_current = 3700
    
    return jsonify({
        'accounts': {
            'data': formatted_accounts,
            'total_balance': total_balance
        },
        'transactions': {
            'recent': formatted_transactions
        },
        'budgets': {
            'data': formatted_budgets,
            'total': total_budget,
            'spent': spent,
            'remaining': total_budget - spent
        },
        'goals': {
            'data': formatted_goals,
            'total': goals_total,
            'current': goals_current,
            'progress': round((goals_current / goals_total * 100) if goals_total > 0 else 0, 2)
        },
        'summary': {
            'net_worth': total_balance,
            'income_this_month': sum(t.get('amount', 0) for t in formatted_transactions if t.get('type') == 'income'),
            'expenses_this_month': sum(t.get('amount', 0) for t in formatted_transactions if t.get('type') == 'expense'),
            'savings_rate': 25  # Mock value
        }
    }), 200

@app.route('/api/dashboard/accounts', methods=['GET'])
@token_required
def get_accounts(current_user):
    user_id = current_user['_id']
    
    accounts = list(accounts_collection.find({'user_id': user_id}))
    
    if not accounts:
        # Create a default account if none exists
        default_account = {
            'user_id': user_id,
            'name': 'Cash Account',
            'type': 'Cash',
            'balance': 1000.00,
            'currency': 'USD',
            'created_at': datetime.datetime.utcnow()
        }
        accounts_collection.insert_one(default_account)
        accounts = [default_account]
    
    formatted_accounts = [{
        'id': str(account['_id']),
        'name': account.get('name', ''),
        'type': account.get('type', ''),
        'balance': account.get('balance', 0),
        'currency': account.get('currency', 'USD')
    } for account in accounts]
    
    return jsonify({
        'accounts': formatted_accounts,
        'total_balance': sum(account.get('balance', 0) for account in accounts)
    }), 200

@app.route('/api/dashboard/transactions', methods=['GET'])
@token_required
def get_transactions(current_user):
    user_id = current_user['_id']
    
    # Optional query parameters
    limit = request.args.get('limit', default=10, type=int)
    skip = request.args.get('skip', default=0, type=int)
    category = request.args.get('category')
    transaction_type = request.args.get('type')  # income or expense
    
    # Build the query
    query = {'user_id': user_id}
    if category:
        query['category'] = category
    if transaction_type:
        query['type'] = transaction_type
    
    # Get transactions
    transactions = list(transactions_collection.find(query).sort('date', -1).skip(skip).limit(limit))
    
    # Get the total count
    total_count = transactions_collection.count_documents(query)
    
    if not transactions:
        # Return mock data
        mock_transactions = [
            {
                'id': 'mock-tx-1',
                'date': datetime.datetime.utcnow().isoformat(),
                'description': 'Grocery shopping',
                'amount': 120.50,
                'category': 'Food',
                'type': 'expense'
            },
            {
                'id': 'mock-tx-2',
                'date': (datetime.datetime.utcnow() - datetime.timedelta(days=1)).isoformat(),
                'description': 'Salary',
                'amount': 3000.00,
                'category': 'Income',
                'type': 'income'
            },
            {
                'id': 'mock-tx-3',
                'date': (datetime.datetime.utcnow() - datetime.timedelta(days=2)).isoformat(),
                'description': 'Restaurant',
                'amount': 75.20,
                'category': 'Dining',
                'type': 'expense'
            }
        ]
        return jsonify({
            'transactions': mock_transactions,
            'total_count': len(mock_transactions),
            'current_page': 1,
            'total_pages': 1
        }), 200
    
    formatted_transactions = [{
        'id': str(transaction['_id']),
        'date': transaction.get('date', datetime.datetime.utcnow()).isoformat(),
        'description': transaction.get('description', ''),
        'amount': transaction.get('amount', 0),
        'category': transaction.get('category', 'Uncategorized'),
        'type': transaction.get('type', 'expense')
    } for transaction in transactions]
    
    return jsonify({
        'transactions': formatted_transactions,
        'total_count': total_count,
        'current_page': skip // limit + 1,
        'total_pages': (total_count + limit - 1) // limit
    }), 200

@app.route('/api/dashboard/budgets', methods=['GET'])
@token_required
def get_budgets(current_user):
    user_id = current_user['_id']
    
    budgets = list(budgets_collection.find({'user_id': user_id}))
    
    if not budgets:
        # Return mock data
        mock_budgets = [
            {
                'id': 'mock-budget-1',
                'category': 'Food',
                'amount': 500,
                'spent': 320,
                'period': 'monthly'
            },
            {
                'id': 'mock-budget-2',
                'category': 'Entertainment',
                'amount': 200,
                'spent': 150,
                'period': 'monthly'
            },
            {
                'id': 'mock-budget-3',
                'category': 'Transportation',
                'amount': 300,
                'spent': 180,
                'period': 'monthly'
            }
        ]
        return jsonify({
            'budgets': mock_budgets,
            'total': 1000,
            'spent': 650,
            'remaining': 350
        }), 200
    
    formatted_budgets = [{
        'id': str(budget['_id']),
        'category': budget.get('category', ''),
        'amount': budget.get('amount', 0),
        'spent': budget.get('spent', 0),
        'period': budget.get('period', 'monthly')
    } for budget in budgets]
    
    total_budget = sum(budget.get('amount', 0) for budget in budgets)
    total_spent = sum(budget.get('spent', 0) for budget in budgets)
    
    return jsonify({
        'budgets': formatted_budgets,
        'total': total_budget,
        'spent': total_spent,
        'remaining': total_budget - total_spent
    }), 200

@app.route('/api/dashboard/goals', methods=['GET'])
@token_required
def get_goals(current_user):
    user_id = current_user['_id']
    
    goals = list(goals_collection.find({'user_id': user_id}))
    
    if not goals:
        # Return mock data
        mock_goals = [
            {
                'id': 'mock-goal-1',
                'name': 'Emergency Fund',
                'target_amount': 10000,
                'current_amount': 2500,
                'deadline': (datetime.datetime.utcnow() + datetime.timedelta(days=365)).isoformat(),
                'priority': 'high'
            },
            {
                'id': 'mock-goal-2',
                'name': 'Vacation',
                'target_amount': 3000,
                'current_amount': 1200,
                'deadline': (datetime.datetime.utcnow() + datetime.timedelta(days=180)).isoformat(),
                'priority': 'medium'
            }
        ]
        
        goals_total = 13000
        goals_current = 3700
        
        return jsonify({
            'goals': mock_goals,
            'total': goals_total,
            'current': goals_current,
            'progress': round(goals_current / goals_total * 100, 2)
        }), 200
    
    formatted_goals = [{
        'id': str(goal['_id']),
        'name': goal.get('name', ''),
        'target_amount': goal.get('target_amount', 0),
        'current_amount': goal.get('current_amount', 0),
        'deadline': goal.get('deadline', '').isoformat() if goal.get('deadline') else None,
        'priority': goal.get('priority', 'medium')
    } for goal in goals]
    
    goals_total = sum(goal.get('target_amount', 0) for goal in goals)
    goals_current = sum(goal.get('current_amount', 0) for goal in goals)
    
    return jsonify({
        'goals': formatted_goals,
        'total': goals_total,
        'current': goals_current,
        'progress': round((goals_current / goals_total * 100) if goals_total > 0 else 0, 2)
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 