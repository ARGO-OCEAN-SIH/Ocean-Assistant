# Ocean Voice Assistant 🌊🎤

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Hackathon-SIH_2024-orange)](https://sih.gov.in)

A voice-enabled AI assistant that democratizes access to oceanographic data from Argo floats using natural language commands.

## 🚀 Features

- **Voice Interface**: Speak naturally to query ocean data
- **Real-time Visualization**: Interactive maps and depth profiles
- **Smart Query Understanding**: NLP-powered data retrieval
- **Multi-modal Access**: Voice, text, and visual interface
- **Ocean Data Integration**: Real Argo float dataset support

## 🗣️ Voice Commands Examples

- *"Show me temperature profiles near the equator"*
- *"Compare salinity data in Arabian Sea for last 6 months"*
- *"What are the nearest Argo floats to Mumbai?"*
- *"Plot ocean temperature trends since 2020"*

## 🛠️ Tech Stack

### Backend
- **Python** + **FastAPI** - REST API server
- **PostgreSQL** + **PostGIS** - Geospatial database
- **SQLAlchemy** - Database ORM

### Voice Processing
- **SpeechRecognition** - Speech-to-text conversion
- **pyttsx3** - Text-to-speech synthesis
- **Google Speech API** - Cloud-based recognition

### Frontend & Visualization
- **Streamlit** - Interactive web dashboard
- **Plotly** - Interactive charts and graphs
- **PyDeck** - Geospatial mapping

### Data Processing
- **xarray** + **netCDF4** - Ocean data processing
- **pandas** - Data manipulation
- **Argopy** - Argo data access

## 📦 Installation

### Prerequisites
- Python 3.8+
- PostgreSQL with PostGIS
- Microphone hardware

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ocean-voice-assistant.git
   cd ocean-voice-assistant