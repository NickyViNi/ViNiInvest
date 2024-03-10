from flask.cli import AppGroup
from .users import seed_users, undo_users
from .portfolios import seed_portfolios, undo_portfolio
from .stocks import seed_stocks, undo_stocks
from .prices import seed_prices, undo_prices
from .transactions import seed_transactions, undo_transactions
from .portfolio_stocks import seed_portfolio_stocks, undo_portfolio_stocks
from .watchlist import seed_watchlists, undo_watchlists
from .watchlist_stocks import seed_watchlist_stocks, undo_watchlist_stocks
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        unseed_all_tables()
    seed_all_tables()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    unseed_all_tables()
    # Add other undo functions here

@seed_commands.command('reset')
def seed_reset():
    unseed_all_tables()
    seed_all_tables()


def unseed_all_tables():
    undo_watchlist_stocks()
    undo_watchlists()
    undo_portfolio_stocks()
    undo_prices()
    undo_transactions()
    undo_stocks()
    undo_portfolio()
    undo_users()

def seed_all_tables():
    seed_users()
    seed_portfolios()
    seed_stocks()
    seed_transactions()
    seed_prices()
    seed_portfolio_stocks()
    seed_watchlists()
    seed_watchlist_stocks()
