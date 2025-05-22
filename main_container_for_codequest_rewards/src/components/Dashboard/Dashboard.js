import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Dashboard.css';

/**
 * Dashboard component for CodeQuest Rewards
 * Displays user statistics, recent activity, and other relevant information
 */
const Dashboard = () => {
  const { 
    users, 
    leaderboard, 
    activityFeed,
    mergeRequests,
    projects,
    getLevelInfo
  } = useAppContext();

  // Get top 3 users for leaderboard preview
  const topUsers = leaderboard.slice(0, 3);
  
  // Get recent activities (limit to 5)
  const recentActivities = activityFeed.slice(0, 5);

  // Calculate total statistics
  const totalBugsFound = users.reduce((total, user) => total + user.bugsFound, 0);
  const totalMRsReviewed = users.reduce((total, user) => total + user.mergeRequestsReviewed, 0);
  const activeMRs = mergeRequests.filter(mr => mr.status === 'Open').length;

  // Format date for activity feed
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>CodeQuest Rewards Dashboard</h1>
        <p className="dashboard-subtitle">Track, reward, and improve code quality through gamified code reviews</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Bugs Found</h3>
          <div className="stat-value">{totalBugsFound}</div>
          <div className="stat-icon">🐛</div>
        </div>
        <div className="stat-card">
          <h3>MRs Reviewed</h3>
          <div className="stat-value">{totalMRsReviewed}</div>
          <div className="stat-icon">👁️</div>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-icon">📋</div>
        </div>
        <div className="stat-card">
          <h3>Active MRs</h3>
          <div className="stat-value">{activeMRs}</div>
          <div className="stat-icon">📝</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section leaderboard-preview">
          <div className="section-header">
            <h2>Top Reviewers</h2>
            <Link to="/leaderboard" className="view-all">View All</Link>
          </div>
          <div className="leaderboard-list">
            {topUsers.map((user, index) => {
              const levelInfo = getLevelInfo(user.points);
              return (
                <div key={user.id} className="leaderboard-item">
                  <div className="leaderboard-rank">{index + 1}</div>
                  <div className="leaderboard-avatar">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <div className="leaderboard-info">
                    <Link to={`/user/${user.id}`} className="leaderboard-name">{user.name}</Link>
                    <div className="leaderboard-details">
                      <span className="leaderboard-level">Level {levelInfo.level} ({levelInfo.title})</span>
                      <span className="leaderboard-points">{user.points} points</span>
                    </div>
                  </div>
                  <div className="leaderboard-achievements">
                    {user.achievements.length > 0 && (
                      <div className="achievement-badges">
                        {user.achievements.slice(0, 3).map((achievement, i) => (
                          <div key={i} className="achievement-badge" title={achievement}>
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
                        {user.achievements.length > 3 && (
                          <div className="achievement-badge more">+{user.achievements.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dashboard-section activity-feed">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'bug_found' ? '🐛' : 
                   activity.type === 'achievement_earned' ? '🏆' : 
                   activity.type === 'level_up' ? '⬆️' : '📝'}
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <span className="activity-user">{activity.user.name}</span>
                    <span className="activity-time">{formatDate(activity.timestamp)}</span>
                  </div>
                  <div className="activity-description">
                    {activity.type === 'bug_found' && (
                      <>Found a bug: <strong>{activity.details.description}</strong> (+{activity.details.points} pts)</>
                    )}
                    {activity.type === 'achievement_earned' && (
                      <>Earned achievement: <strong>{activity.details.name}</strong></>
                    )}
                    {activity.type === 'level_up' && (
                      <>Leveled up to <strong>Level {activity.details.newLevel}</strong> ({activity.details.title})</>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section active-projects">
          <div className="section-header">
            <h2>Active Projects</h2>
            <Link to="/projects" className="view-all">View All</Link>
          </div>
          <div className="projects-grid">
            {projects.slice(0, 4).map((project) => (
              <Link to={`/project/${project.id}`} key={project.id} className="project-card">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <div className="project-meta-item">
                    <span className="meta-label">Team</span>
                    <span className="meta-value">{project.team}</span>
                  </div>
                  <div className="project-meta-item">
                    <span className="meta-label">Active MRs</span>
                    <span className="meta-value">{project.activeMRs}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
