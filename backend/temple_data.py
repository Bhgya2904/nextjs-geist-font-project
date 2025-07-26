"""
Temple dataset management module
Contains sample Indian temple data with metadata
"""

# Sample temple dataset - in production, this would be loaded from a database or scraped data
TEMPLES_DATA = [
    {
        "id": 1,
        "name": "Brihadeeswarar Temple",
        "deity": "Shiva",
        "state": "Tamil Nadu",
        "city": "Thanjavur",
        "history": "Built by Raja Raja Chola I in 1010 CE, this UNESCO World Heritage site is one of the largest temples in India and a masterpiece of Dravidian architecture.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Thanjavur_Brihadishvara_Temple.jpg/800px-Thanjavur_Brihadishvara_Temple.jpg",
        "location": {"lat": 10.7825, "lng": 79.1317},
        "era": "Medieval",
        "architecture": "Dravidian",
        "significance": "UNESCO World Heritage Site"
    },
    {
        "id": 2,
        "name": "Meenakshi Amman Temple",
        "deity": "Parvati",
        "state": "Tamil Nadu",
        "city": "Madurai",
        "history": "Ancient temple dedicated to Goddess Meenakshi and Lord Sundareswarar. The current structure was built in the 17th century with stunning gopurams and intricate sculptures.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Meenakshi_Amman_Temple%2C_Madurai.jpg/800px-Meenakshi_Amman_Temple%2C_Madurai.jpg",
        "location": {"lat": 9.9195, "lng": 78.1193},
        "era": "Ancient",
        "architecture": "Dravidian",
        "significance": "Major pilgrimage site"
    },
    {
        "id": 3,
        "name": "Kashi Vishwanath Temple",
        "deity": "Shiva",
        "state": "Uttar Pradesh",
        "city": "Varanasi",
        "history": "One of the twelve Jyotirlingas, this ancient temple is dedicated to Lord Vishwanath. The current structure was built by Ahilyabai Holkar in 1780.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Kashi_Vishwanath_Temple_Varanasi.jpg/800px-Kashi_Vishwanath_Temple_Varanasi.jpg",
        "location": {"lat": 25.3109, "lng": 83.0107},
        "era": "Ancient",
        "architecture": "North Indian",
        "significance": "Jyotirlinga"
    },
    {
        "id": 4,
        "name": "Jagannath Temple",
        "deity": "Vishnu",
        "state": "Odisha",
        "city": "Puri",
        "history": "Famous for the annual Rath Yatra, this 12th-century temple is dedicated to Lord Jagannath, an incarnation of Vishnu.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jagannath_Temple_Puri.jpg/800px-Jagannath_Temple_Puri.jpg",
        "location": {"lat": 19.8135, "lng": 85.8312},
        "era": "Medieval",
        "architecture": "Kalinga",
        "significance": "Char Dham pilgrimage"
    },
    {
        "id": 5,
        "name": "Golden Temple",
        "deity": "Guru Nanak",
        "state": "Punjab",
        "city": "Amritsar",
        "history": "The holiest Gurdwara of Sikhism, built in the 16th century. The temple is covered in gold and surrounded by a sacred pool.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Golden_Temple_India.jpg/800px-Golden_Temple_India.jpg",
        "location": {"lat": 31.6200, "lng": 74.8765},
        "era": "Medieval",
        "architecture": "Sikh",
        "significance": "Holiest Sikh shrine"
    },
    {
        "id": 6,
        "name": "Somnath Temple",
        "deity": "Shiva",
        "state": "Gujarat",
        "city": "Somnath",
        "history": "One of the twelve Jyotirlingas, this temple has been destroyed and rebuilt multiple times. The current structure was completed in 1951.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Somnath_temple.jpg/800px-Somnath_temple.jpg",
        "location": {"lat": 20.8880, "lng": 70.4017},
        "era": "Ancient",
        "architecture": "Chalukya",
        "significance": "Jyotirlinga"
    },
    {
        "id": 7,
        "name": "Tirupati Balaji Temple",
        "deity": "Vishnu",
        "state": "Andhra Pradesh",
        "city": "Tirupati",
        "history": "One of the richest temples in the world, dedicated to Lord Venkateswara. The temple receives millions of pilgrims annually.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tirumala_Venkateswara_Temple.jpg/800px-Tirumala_Venkateswara_Temple.jpg",
        "location": {"lat": 13.6833, "lng": 79.3167},
        "era": "Ancient",
        "architecture": "Dravidian",
        "significance": "Richest temple in the world"
    },
    {
        "id": 8,
        "name": "Kedarnath Temple",
        "deity": "Shiva",
        "state": "Uttarakhand",
        "city": "Kedarnath",
        "history": "One of the twelve Jyotirlingas, located at an altitude of 3,583 meters in the Himalayas. Part of the Char Dham pilgrimage.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kedarnath_Temple.jpg/800px-Kedarnath_Temple.jpg",
        "location": {"lat": 30.7346, "lng": 79.0669},
        "era": "Ancient",
        "architecture": "North Indian",
        "significance": "Jyotirlinga, Char Dham"
    },
    {
        "id": 9,
        "name": "Konark Sun Temple",
        "deity": "Surya",
        "state": "Odisha",
        "city": "Konark",
        "history": "Built in the 13th century, this UNESCO World Heritage site is designed as a giant chariot of the Sun God with intricate stone carvings.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Konark_Sun_Temple.jpg/800px-Konark_Sun_Temple.jpg",
        "location": {"lat": 19.8876, "lng": 86.0945},
        "era": "Medieval",
        "architecture": "Kalinga",
        "significance": "UNESCO World Heritage Site"
    },
    {
        "id": 10,
        "name": "Badrinath Temple",
        "deity": "Vishnu",
        "state": "Uttarakhand",
        "city": "Badrinath",
        "history": "One of the Char Dham pilgrimage sites, dedicated to Lord Badrinath (Vishnu). Located in the Garhwal Himalayas.",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Badrinath_Temple.jpg/800px-Badrinath_Temple.jpg",
        "location": {"lat": 30.7433, "lng": 79.4938},
        "era": "Ancient",
        "architecture": "North Indian",
        "significance": "Char Dham pilgrimage"
    }
]

def get_all_temples():
    """Return all temples in the dataset"""
    return TEMPLES_DATA

def get_temple_by_id(temple_id: int):
    """Return a specific temple by ID"""
    for temple in TEMPLES_DATA:
        if temple["id"] == temple_id:
            return temple
    return None

def search_temples_by_filters(state=None, deity=None, era=None):
    """Filter temples by various criteria"""
    filtered_temples = TEMPLES_DATA
    
    if state:
        filtered_temples = [t for t in filtered_temples if t["state"].lower() == state.lower()]
    
    if deity:
        filtered_temples = [t for t in filtered_temples if t["deity"].lower() == deity.lower()]
    
    if era:
        filtered_temples = [t for t in filtered_temples if t["era"].lower() == era.lower()]
    
    return filtered_temples

def get_temple_text_for_embedding(temple):
    """Create searchable text for a temple for vector embeddings"""
    return f"{temple['name']} {temple['deity']} {temple['state']} {temple['city']} {temple['history']} {temple['era']} {temple['architecture']}"
