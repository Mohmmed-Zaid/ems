// EmpManagementSys.Service.EmployeeService.java
package EmpManagementSys.Service;

import EmpManagementSys.model.Employee;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    String createEmployee(Employee employee);
    List<Employee> readEmployees();
    Optional<Employee> getEmployeeById(Long id);
    Employee updateEmployee(Long id, Employee employee);
    boolean deleteEmployee(Long id);
    List<Employee> findByDepartment(String department);
}
