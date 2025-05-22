import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Leaderboard.css';

/**
 * Leaderboard component
 * Displays a ranked list of users based on their points and achievements
 */
const Leaderboard = () => {
  const { leaderboard, getLevelInfo } = useAppContext();
  const [timeFilter, setTimeFilter] = useState('all-time'); // 'all-time', 'monthly', 'weekly'

  // In a real app, we would filter based on the selected time period
  // For this mock version, we'll just use the same leaderboard data
  const filteredLeaderboard = leaderboard;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>Reviewer Leaderboard</h1>
        <p className="leaderboard-subtitle">Top code reviewers ranked by points earned from finding bugs and issues</p>
      </div>

      <div className="leaderboard-filters">
        <div className="filter-group">
          <label>Time Period:</label>
          <div className="filter-options">
            <button 
              className={`filter-option ${timeFilter === 'all-time' ? 'active' : ''}`}
              onClick={() => setTimeFilter('all-time')}
            >
              All Time
            </button>
            <button 
              className={`filter-option ${timeFilter === 'monthly' ? 'active' : ''}`}
              onClick={() => setTimeFilter('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`filter-option ${timeFilter === 'weekly' ? 'active' : ''}`}
              onClick={() => setTimeFilter('weekly')}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>

      <div className="full-leaderboard">
        <div className="leaderboard-table-header">
          <div className="rank-cell">Rank</div>
          <div className="user-cell">Reviewer</div>
          <div className="level-cell">Level</div>
          <div className="bugs-cell">Bugs Found</div>
          <div className="achievements-cell">Achievements</div>
          <div className="points-cell">Points</div>
        </div>

        {filteredLeaderboard.map((user, index) => {
          const levelInfo = getLevelInfo(user.points);
          
          return (
            <Link to={`/user/${user.id}`} key={user.id} className="leaderboard-row">
              <div className="rank-cell">
                <div className={`rank-badge ${index < 3 ? `top-${index + 1}` : ''}`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="user-cell">
                <div className="user-avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role} · {user.department}</div>
                </div>
              </div>
              
              <div className="level-cell">
                <div className="level-badge">
                  {user.level}
                </div>
                <span className="level-title">{levelInfo.title}</span>
              </div>
              
              <div className="bugs-cell">
                <div className="bugs-found-number">{user.bugsFound}</div>
                <div className="mrs-reviewed-number">{user.mergeRequestsReviewed} MRs</div>
              </div>
              
              <div className="achievements-cell">
                <div className="achievement-badges">
                  {user.achievements.map((achievement, i) => (
                    <div 
                      key={i} 
                      className="achievement-icon" 
                      title={achievement}
                    >
                      {achievement === "Bug Hunter" ? "🐛" : 
                       achievement === "Code Wizard" ? "🧙‍♂️" :
                       achievement === "Consistency King" ? "👑" :
                       achievement === "Detail Detective" ? "🔍" :
                       achievement === "Early Bird" ? "🐦" :
                       achievement === "Reliability Champion" ? "🏆" :
                       achievement === "Security Sentinel" ? "🛡️" :
                       achievement === "Top Reviewer" ? "⭐" : "🏅"}
                    </div>
                  ))}
                  {user.achievements.length === 0 && (
                    <span className="no-achievements">None yet</span>
                  )}
                </div>
              </div>
              
              <div className="points-cell">
                <div className="points-value">{user.points}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
