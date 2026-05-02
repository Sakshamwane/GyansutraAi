import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Calendar, Clock, MapPin, ExternalLink, ChevronRight, Info } from 'lucide-react';
import './Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMode, setSelectedMode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
                const res = await axios.get(`${API_BASE}/api/training/events/`);
                setEvents(res.data);
                setFilteredEvents(res.data);
                if (res.data.length > 0) {
                    setSelectedEvent(res.data[0]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let result = events;

        if (searchTerm) {
            result = result.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedMode) {
            result = result.filter(event => event.category === selectedMode);
        }

        setFilteredEvents(result);
        
        // Update selected event if the current one is no longer in filtered results
        if (result.length > 0 && (!selectedEvent || !result.find(e => e.id === selectedEvent.id))) {
            setSelectedEvent(result[0]);
        } else if (result.length === 0) {
            setSelectedEvent(null);
        }
    }, [searchTerm, selectedMode, events]);

    const handleClearFilter = () => {
        setSearchTerm('');
        setSelectedMode('');
    };

    const categories = [...new Set(events.map(e => e.category))];

    if (loading) {
        return (
            <div className="events-container">
                <div className="empty-state">
                    <p>Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="events-container">
            {/* Side Panel */}
            <aside className="events-sidebar">
                <div className="sidebar-header">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-row">
                        <select 
                            className="mode-select" 
                            value={selectedMode}
                            onChange={(e) => setSelectedMode(e.target.value)}
                        >
                            <option value="">All Modes</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {(searchTerm || selectedMode) && (
                            <button className="clear-filter" onClick={handleClearFilter}>
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="event-list">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div 
                                key={event.id} 
                                className={`event-card-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <h4>{event.title}</h4>
                                <div className="event-card-meta">
                                    <span><Calendar size={14} /> {new Date(event.date).toLocaleDateString()}</span>
                                    <span><Clock size={14} /> {event.time}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <Info size={40} />
                            <p>No events found</p>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Panel */}
            <main className="event-main">
                {selectedEvent ? (
                    <div className="event-details-content animate-fade-in-up">
                        <span className="event-category-badge">{selectedEvent.category}</span>
                        <h1 className="event-title-main">{selectedEvent.title}</h1>
                        
                        <div className="event-info-grid">
                            <div className="info-item">
                                <span className="info-label">Date</span>
                                <span className="info-value">{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Time</span>
                                <span className="info-value">{selectedEvent.time}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mode</span>
                                <span className="info-value">{selectedEvent.category}</span>
                            </div>
                        </div>

                        <div className="event-description-rich">
                            {selectedEvent.description.split('\n').map((paragraph, i) => (
                                <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="join-btn-container">
                            <a 
                                href={selectedEvent.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary join-now-btn"
                            >
                                Join Now <ExternalLink size={18} style={{ marginLeft: '0.5rem' }} />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <Info size={60} />
                        <h3>Select an event to see details</h3>
                        <p>Browse the list on the left to find interesting events.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Events;
