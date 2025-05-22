import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './MergeRequests.css';

/**
 * MergeRequestList component
 * Displays a list of merge requests with filtering options
 */
const MergeRequestList = () => {
  const { mergeRequests, projects, getUserById } = useAppContext();
  const [filter, setFilter] = useState('all'); // 'all', 'open', 'merged'
  const [projectFilter, setProjectFilter] = useState('all');

  // Filter merge requests based on selected filters
  const filteredMergeRequests = mergeRequests.filter(mr => {
    // Filter by status
    if (filter === 'open' && mr.status !== 'Open') return false;
    if (filter === 'merged' && mr.status !== 'Merged') return false;
    
    // Filter by project
    if (projectFilter !== 'all' && mr.projectId !== parseInt(projectFilter)) return false;
    
    return true;
  });

  // Get project name by ID
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
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
  
  // Calculate total bugs found in a merge request
  const getTotalBugs = (mr) => {
    return mr.bugsFound.length;
  };
  
  // Calculate total points from bugs in a merge request
  const getTotalPoints = (mr) => {
    return mr.bugsFound.reduce((total, bug) => total + bug.points, 0);
  };

  return (
    <div className="merge-request-list-container">
      <div className="merge-request-header">
        <h1>Merge Requests</h1>
        <p className="merge-request-subtitle">Review and track bugs found in merge requests</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-options">
            <button 
              className={`filter-option ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-option ${filter === 'open' ? 'active' : ''}`}
              onClick={() => setFilter('open')}
            >
              Open
            </button>
            <button 
              className={`filter-option ${filter === 'merged' ? 'active' : ''}`}
              onClick={() => setFilter('merged')}
            >
              Merged
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Project:</label>
          <select 
            className="project-select"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="merge-request-count">
        {filteredMergeRequests.length} {filteredMergeRequests.length === 1 ? 'merge request' : 'merge requests'}
      </div>

      <div className="merge-request-list">
        {filteredMergeRequests.length > 0 ? (
          filteredMergeRequests.map(mr => {
            const author = getUserById(mr.author.id);
            const totalBugs = getTotalBugs(mr);
            const totalPoints = getTotalPoints(mr);
            
            return (
              <Link to={`/merge-request/${mr.id}`} key={mr.id} className="merge-request-card">
                <div className="merge-request-card-header">
                  <div className="merge-request-title">{mr.title}</div>
                  <div className={`merge-request-status status-${mr.status.toLowerCase()}`}>
                    {mr.status}
                  </div>
                </div>
                
                <div className="merge-request-project">
                  {getProjectName(mr.projectId)}
                </div>
                
                <div className="merge-request-meta">
                  <div className="merge-request-author">
                    <img 
                      src={author?.avatar || 'https://i.pravatar.cc/150?img=0'} 
                      alt={mr.author.name} 
                      className="author-avatar" 
                    />
                    <span>{mr.author.name}</span>
                  </div>
                  <div className="merge-request-date">
                    <span className="meta-label">Updated:</span> {formatDate(mr.updatedAt)}
                  </div>
                </div>
                
                <div className="merge-request-stats">
                  <div className="bug-count">
                    <span className="bug-icon">🐛</span>
                    <span className="bug-number">{totalBugs}</span>
                    <span className="bug-label">bugs found</span>
                  </div>
                  <div className="points-count">
                    <span className="points-number">{totalPoints}</span>
                    <span className="points-label">points awarded</span>
                  </div>
                </div>
                
                <div className="merge-request-reviewers">
                  <div className="reviewers-label">Reviewers:</div>
                  <div className="reviewer-avatars">
                    {mr.reviewers.map((reviewer, index) => {
                      const reviewerData = getUserById(reviewer.id);
                      return (
                        <div 
                          key={index} 
                          className="reviewer-avatar-wrapper" 
                          title={`${reviewer.name} (${reviewer.status})`}
                        >
                          <img 
                            src={reviewerData?.avatar || 'https://i.pravatar.cc/150?img=0'} 
                            alt={reviewer.name} 
                            className={`reviewer-avatar status-${reviewer.status.toLowerCase().replace(' ', '-')}`} 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="no-merge-requests">
            <div className="no-data-icon">🔍</div>
            <h3>No Merge Requests Found</h3>
            <p>Try changing your filter settings to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergeRequestList;
