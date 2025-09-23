# Backend_Side/database_routers.py
class DatabaseRouter:
    """
    Router to send ArgoMeasurement to PostgreSQL, everything else to SQLite
    """
    
    def db_for_read(self, model, **hints):
        if model._meta.model_name == 'argomeasurement':
            return 'data'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.model_name == 'argomeasurement':
            return 'data'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        # Allow relations between objects in the same database
        db1 = self.db_for_read(obj1.__class__)
        db2 = self.db_for_read(obj2.__class__)
        return db1 == db2

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if model_name == 'argomeasurement':
            return db == 'data'
        return db == 'default'