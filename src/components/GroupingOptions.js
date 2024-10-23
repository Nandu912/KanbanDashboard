import React from 'react';

const GroupingOptions = ({ setGroupingOption, setSortOption }) => {
  return (
    <div className="grouping-options">
      <div>
        <label htmlFor="group-by">Group By:</label>
        <select id="group-by" onChange={(e) => setGroupingOption(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" onChange={(e) => setSortOption(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default GroupingOptions;
