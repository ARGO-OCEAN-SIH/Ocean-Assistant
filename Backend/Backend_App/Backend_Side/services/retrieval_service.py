


# services/retrieval_service.py
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "db.sqlite3")

def get_db_answer(query: str):
    """
    Very simple technical Q&A using sqlite.
    Later you can connect this to chroma_db for vector search (RAG).
    """
    try:
        # Example: check if user asks about "stations" or "measurements"
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        if "stations" in query.lower():
            cursor.execute("SELECT name, location FROM stations LIMIT 5;")
            results = cursor.fetchall()
            conn.close()
            if results:
                return {
                    "response": f"Here are some stations: {results}",
                    "success": True,
                    "model": "database"
                }

        elif "temperature" in query.lower():
            cursor.execute("SELECT station_id, avg(temp) FROM measurements GROUP BY station_id LIMIT 5;")
            results = cursor.fetchall()
            conn.close()
            if results:
                return {
                    "response": f"Temperature data: {results}",
                    "success": True,
                    "model": "database"
                }

        # Default DB fallback
        return {
            "response": "I could not find exact data, please refine your technical query.",
            "success": False,
            "model": "database"
        }

    except Exception as e:
        return {
            "response": f"Database error: {e}",
            "success": False,
            "model": "database"
        }
