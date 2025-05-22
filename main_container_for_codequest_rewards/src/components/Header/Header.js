import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

/**
 * Header component for the CodeQuest Rewards application
 * Displays the navigation bar and user information
 */
const Header = () => {
  const { leaderboard } = useAppContext();
  
  // Get top user for display
  const topUser = leaderboard.length > 0 ? leaderboard[0] : null;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-symbol">🏆</span> CodeQuest Rewards
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/merge-requests" className="nav-link">Merge Requests</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </div>
          
          {topUser && (
            <div className="top-user">
              <span className="top-user-label">Top Reviewer:</span>
              <Link to={`/user/${topUser.id}`} className="top-user-name">
                {topUser.name}
                <span className="top-user-points">{topUser.points} pts</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
