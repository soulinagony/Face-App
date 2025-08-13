"""create user stats table

Revision ID: create_user_stats_table
Revises: 6f438f45bb66
Create Date: 2024-01-15 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'create_user_stats_table'
down_revision = '6f438f45bb66'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('user_stats',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('total_exercises_completed', sa.Integer(), nullable=True, default=0),
        sa.Column('total_workout_time_minutes', sa.Integer(), nullable=True, default=0),
        sa.Column('total_xp_earned', sa.Integer(), nullable=True, default=0),
        sa.Column('current_streak_days', sa.Integer(), nullable=True, default=0),
        sa.Column('best_streak_days', sa.Integer(), nullable=True, default=0),
        sa.Column('level', sa.Integer(), nullable=True, default=1),
        sa.Column('xp_to_next_level', sa.Integer(), nullable=True, default=150),
        sa.Column('exercises_completed_today', sa.Integer(), nullable=True, default=0),
        sa.Column('workout_time_today_minutes', sa.Integer(), nullable=True, default=0),
        sa.Column('xp_earned_today', sa.Integer(), nullable=True, default=0),
        sa.Column('last_workout_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_stats_id'), 'user_stats', ['id'], unique=False)
    op.create_index(op.f('ix_user_stats_user_id'), 'user_stats', ['user_id'], unique=False)

def downgrade():
    op.drop_index(op.f('ix_user_stats_user_id'), table_name='user_stats')
    op.drop_index(op.f('ix_user_stats_id'), table_name='user_stats')
    op.drop_table('user_stats') 