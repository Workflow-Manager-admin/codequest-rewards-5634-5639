import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './UserProfile.css';

/**
 * UserProfile component
 * Displays detailed information about a specific user
 */
const UserProfile = () => {
  const { id } = useParams();
  const { 
    getUserById, 
    getBugsByUser, 
    getMergeRequestsByReviewer,
    getAchievementById,
    getLevelInfo,
    leaderboard
  } = useAppContext();
  
  const [user, setUser] = useState(null);
  const [userBugs, setUserBugs] = useState([]);
  const [userMRs, setUserMRs] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [nextLevelInfo, setNextLevelInfo] = useState(null);
  const [progressToNextLevel, setProgressToNextLevel] = useState(0);

  // Load user data
  useEffect(() => {
    if (!id) return;
    
    const userData = getUserById(parseInt(id));
    if (userData) {
      setUser(userData);
      
      // Get bugs found by this user
      const bugs = getBugsByUser(userData.id);
      setUserBugs(bugs);
      
      // Get MRs reviewed by this user
      const mrs = getMergeRequestsByReviewer(userData.id);
      setUserMRs(mrs);
      
      // Determine user rank
      const rank = leaderboard.findIndex(u => u.id === userData.id) + 1;
      setUserRank(rank);
      
      // Get level info
      const currentLevel = getLevelInfo(userData.points);
      setLevelInfo(currentLevel);
      
      // Calculate progress to next level
      if (currentLevel.level < 10) {  // Assuming level 10 is max
        const nextLevel = getLevelInfo(currentLevel.maxPoints + 1);
        setNextLevelInfo(nextLevel);
        
        const totalPointsInLevel = currentLevel.maxPoints - currentLevel.minPoints;
        const pointsGained = userData.points - currentLevel.minPoints;
        const progress = (pointsGained / totalPointsInLevel) * 100;
        setProgressToNextLevel(progress);
      } else {
        setProgressToNextLevel(100); // Max level
      }
    }
  }, [id, getUserById, getBugsByUser, getMergeRequestsByReviewer, leaderboard, getLevelInfo]);

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="loading">Loading user data...</div>
      </div>
    );
  }

  // Group bugs by severity
  const bugsBySeverity = {
    Low: userBugs.filter(bug => bug.severity === 'Low').length,
    Medium: userBugs.filter(bug => bug.severity === 'Medium').length,
    High: userBugs.filter(bug => bug.severity === 'High').length,
    Critical: userBugs.filter(bug => bug.severity === 'Critical').length
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <Link to="/leaderboard" className="back-link">
          ← Back to Leaderboard
        </Link>
        
        <div className="profile-banner">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.name} />
            {userRank <= 3 && (
              <div className={`rank-badge rank-${userRank}`}>
                {userRank}
              </div>
            )}
          </div>
          
          <div className="profile-info">
            <h1>{user.name}</h1>
            <div className="profile-meta">
              <div className="profile-role">{user.role}</div>
              <div className="profile-separator">•</div>
              <div className="profile-department">{user.department}</div>
            </div>
          </div>
          
          <div className="profile-score">
            <div className="score-value">{user.points}</div>
            <div className="score-label">Total Points</div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="sidebar-section">
            <h3 className="section-title">Level</h3>
            <div className="level-display">
              <div className="level-number">{user.level}</div>
              <div className="level-title">{levelInfo?.title}</div>
            </div>
            
            {nextLevelInfo && (
              <div className="level-progress-container">
                <div className="level-progress-bar">
                  <div 
                    className="level-progress-fill" 
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <div className="level-progress-label">
                  {user.points} / {levelInfo.maxPoints} points to Level {nextLevelInfo.level}
                </div>
              </div>
            )}
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Achievements</h3>
            {user.achievements.length > 0 ? (
              <div className="achievements-list">
                {user.achievements.map((achievementName, index) => {
                  // Get achievement icon based on name - in a real app we'd use the
                  // achievement object from getAchievementById
                  const achievementIcon = 
                    achievementName === "Bug Hunter" ? "🐛" : 
                    achievementName === "Code Wizard" ? "🧙‍♂️" :
                    achievementName === "Consistency King" ? "👑" :
                    achievementName === "Detail Detective" ? "🔍" :
                    achievementName === "Early Bird" ? "🐦" :
                    achievementName === "Reliability Champion" ? "🏆" :
                    achievementName === "Security Sentinel" ? "🛡️" :
                    achievementName === "Top Reviewer" ? "⭐" : "🏅";
                  
                  return (
                    <div key={index} className="achievement-item">
                      <div className="achievement-icon">{achievementIcon}</div>
                      <div className="achievement-info">
                        <div className="achievement-name">{achievementName}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-achievements">No achievements yet</div>
            )}
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{user.bugsFound}</div>
                <div className="stat-label">Bugs Found</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.mergeRequestsReviewed}</div>
                <div className="stat-label">MRs Reviewed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userRank}</div>
                <div className="stat-label">Rank</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.achievements.length}</div>
                <div className="stat-label">Achievements</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-main">
          <div className="main-section">
            <h3 className="section-title">Bug Discovery Breakdown</h3>
            <div className="bug-breakdown">
              <div className="bug-chart">
                <div className="bug-severity-bar">
                  {bugsBySeverity.Critical > 0 && (
                    <div 
                      className="severity-segment critical" 
                      style={{ 
                        width: `${(bugsBySeverity.Critical / user.bugsFound) * 100}%` 
                      }}
                      title={`Critical: ${bugsBySeverity.Critical}`}
                    ></div>
                  )}
                  {bugsBySeverity.High > 0 && (
                    <div 
                      className="severity-segment high" 
                      style={{ 
                        width: `${(bugsBySeverity.High / user.bugsFound) * 100}%` 
                      }}
                      title={`High: ${bugsBySeverity.High}`}
                    ></div>
                  )}
                  {bugsBySeverity.Medium > 0 && (
                    <div 
                      className="severity-segment medium" 
                      style={{ 
                        width: `${(bugsBySeverity.Medium / user.bugsFound) * 100}%` 
                      }}
                      title={`Medium: ${bugsBySeverity.Medium}`}
                    ></div>
                  )}
                  {bugsBySeverity.Low > 0 && (
                    <div 
                      className="severity-segment low" 
                      style={{ 
                        width: `${(bugsBySeverity.Low / user.bugsFound) * 100}%` 
                      }}
                      title={`Low: ${bugsBySeverity.Low}`}
                    ></div>
                  )}
                </div>
              </div>
              
              <div className="bug-severity-legend">
                <div className="legend-item">
                  <div className="legend-color critical"></div>
                  <div className="legend-label">Critical: {bugsBySeverity.Critical}</div>
                </div>
                <div className="legend-item">
                  <div className="legend-color high"></div>
                  <div className="legend-label">High: {bugsBySeverity.High}</div>
                </div>
                <div className="legend-item">
                  <div className="legend-color medium"></div>
                  <div className="legend-label">Medium: {bugsBySeverity.Medium}</div>
                </div>
                <div className="legend-item">
                  <div className="legend-color low"></div>
                  <div className="legend-label">Low: {bugsBySeverity.Low}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="main-section">
            <h3 className="section-title">Recent Bugs Found</h3>
            {userBugs.length > 0 ? (
              <div className="bugs-list">
                {userBugs.slice(0, 5).map((bug, index) => (
                  <Link to={`/merge-request/${bug.mergeRequestId}`} key={bug.id} className="bug-item">
                    <div className={`bug-severity ${bug.severity.toLowerCase()}`}>
                      {bug.severity}
                    </div>
                    <div className="bug-info">
                      <div className="bug-description">{bug.description}</div>
                      <div className="bug-meta">
                        <div className="bug-mr">
                          MR: {bug.mergeRequestTitle}
                        </div>
                        <div className="bug-points">+{bug.points} pts</div>
                      </div>
                    </div>
                    <div className="bug-status">
                      <span 
                        className={`status-badge ${
                          bug.status === 'Validated' ? 'validated' : 
                          bug.status === 'Pending' ? 'pending' : 'rejected'
                        }`}
                      >
                        {bug.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-data-message">No bugs found yet</div>
            )}
          </div>
          
          <div className="main-section">
            <h3 className="section-title">Reviewed Merge Requests</h3>
            {userMRs.length > 0 ? (
              <div className="mrs-list">
                {userMRs.slice(0, 5).map(mr => (
                  <Link to={`/merge-request/${mr.id}`} key={mr.id} className="mr-item">
                    <div className="mr-info">
                      <div className="mr-title">{mr.title}</div>
                      <div className="mr-meta">
                        <div className="mr-date">
                          Last updated: {formatDate(mr.updatedAt)}
                        </div>
                        <div className="mr-bugs">
                          {mr.bugsFound.length} bugs found
                        </div>
                      </div>
                    </div>
                    <div className="mr-status">
                      <span className={`status-badge ${mr.status.toLowerCase()}`}>
                        {mr.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-data-message">No merge requests reviewed yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
