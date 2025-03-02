import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', email: '', department: '', salary: '', hireDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const addEmployee = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error('Failed to add employee');
      fetchEmployees();
      setNewEmployee({ name: '', phone: '', email: '', department: '', salary: '', hireDate: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const departmentMatch = departmentFilter ? employee.department.toLowerCase().includes(departmentFilter.toLowerCase()) : true;
    const searchMatch = searchTerm ? employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return departmentMatch && searchMatch;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <div className="search-filter-container">
        <input type="text" placeholder="Search by name or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Filter by department" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} />
      </div>
      <div className="add-employee-form">
        <input name="name" placeholder="Name" value={newEmployee.name} onChange={handleInputChange} />
        <input name="phone" placeholder="Phone" value={newEmployee.phone} onChange={handleInputChange} />
        <input name="email" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} />
        <input name="department" placeholder="Department" value={newEmployee.department} onChange={handleInputChange} />
        <input name="salary" placeholder="Salary" value={newEmployee.salary} onChange={handleInputChange} />
        <input name="hireDate" placeholder="Hire Date" type="date" value={newEmployee.hireDate} onChange={handleInputChange} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employee-list">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
            <p>Department: {employee.department}</p>
            <p>Salary: {employee.salary}</p>
            <p>Hire Date: {employee.hireDate}</p>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;