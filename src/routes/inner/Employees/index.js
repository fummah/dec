import React, { useState, useEffect,useRef } from 'react';
import {Col, Row,Card, Alert} from "antd";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import EmployeesList from "components/Inner/Employees/EmployeesList";
import AddEmployee from 'components/Inner/Employees/AddEmployee';
import Toast from "components/AppNotification/toast.js";
import dayjs from 'dayjs';



const Employees = () => {
  const addEmployeeRef = useRef();
  const [loadings, setLoadings] = useState([]);
  const [addUserState, setAddUserState] = useState(false);
  const [user, setUser] = useState(null); 
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeesSearched, setEmployeesSearched] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const onSaveUser = async(userData) => {
    console.log("User Data Saved:", userData);
    
    try {
      
      const first_name = userData.first_name;
      const last_name = userData.last_name;
      const mi = userData.mi;
      const email = userData.email;
      const entered_by = "1";      
      const date_hired = userData.date_hired ? dayjs(userData.date_hired).format('YYYY-MM-DD') : null;

      let result;
        
      if (userData.id) {
        const id = userData.id;
        const employeeData = {id,first_name, last_name, mi, email, date_hired, entered_by};
        result = await window.electronAPI.updateEmployee(employeeData);   
      }
      else{
        result = await window.electronAPI.insertEmployee(first_name, last_name, mi, email, date_hired, entered_by); 
          }
            console.log(result.message);
      setIsSuccess(result.success);  
      if (result.success) {
        setMessage('Employee saved successfully!');
        fetchEmployees();
        if (addEmployeeRef.current) {
          addEmployeeRef.current.resetForm();
          handleUserClose();
      }
      } else {
        setMessage('Failed to save employee. Please try again.');
        setShowError(true);
      }
    } catch (error) {
      setIsSuccess(false);      
      setMessage('An error occurred. Please try again later.');
      setShowError(true);
      console.log(error);
    }
    
  };
  
    const fetchEmployees = async () => {
        try {
            const response = await await window.electronAPI.getAllEmployees();          
            setEmployees(response);
            setEmployeesSearched(response);
        } catch (error) {
          const errorMessage = error.message || "An unknown error occurred.";
          setMessage(`Error fetching employees: ${errorMessage}`);
          setShowError(true);
        }
    };

    useEffect(() => {
      fetchEmployees();
  }, []);

  const handleUserClose = () => {
    setAddUserState(false);
  };
  const showDrawer = () => {
    setSelectedEmployee(null);
    setAddUserState(true);
  };

  const handleSearchedTxt = (event) => {
    const value = event.target.value.toLowerCase();
    if (value.trim() !== '')
    {
      const filtered = employees.filter(
        (item) =>
          (item.first_name && item.first_name.toLowerCase().includes(value)) ||
        (item.mi && item.mi.toLowerCase().includes(value))  ||
        (item.last_name && item.last_name.toLowerCase().includes(value)) 
      );
      setEmployeesSearched(filtered);
    }
    else{
      setEmployeesSearched(employees);
    }
  };
  
  return (
    <Auxiliary> 
      <Toast title="Error" message={message} setShowError={setShowError} show={showError} />
    <Widget
   title={
     <h2 className="h2 gx-text-capitalize gx-mb-0">
       Employees</h2>
   } 
   
   extra={
    <AddEmployee 
    open={addUserState} 
    employee={selectedEmployee}
    onSaveUser={onSaveUser} // Pass the function
    onUserClose={handleUserClose} 
    showDrawer={showDrawer}
    setShowError={setShowError}
    setMessage={setMessage}
    ref={addEmployeeRef}
  />
   }>  
       {isSuccess !== null && (
        <Alert message={message} type={isSuccess?'success':'error'} />
        )
      }
  <Row gutter={[16, 16]}>
          
       <Col xs={24} sm={24} md={24}>
       <EmployeesList employees={employeesSearched} onSelectEmployee={setSelectedEmployee} setAddUserState={setAddUserState} handleSearchedTxt={handleSearchedTxt}/>
       </Col>
      </Row>
  <hr/>
   
   </Widget>
 </Auxiliary>
  );
};

export default Employees;
