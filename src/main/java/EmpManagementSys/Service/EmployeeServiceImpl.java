package EmpManagementSys.Service;

import EmpManagementSys.model.Employee;
import EmpManagementSys.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String createEmployee(Employee employee) {
        Employee saved = employeeRepository.save(employee);
        return "Employee saved successfully with ID: " + saved.getId();
    }

    @Override
    public List<Employee> readEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> existing = getEmployeeById(id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            emp.setName(employee.getName());
            emp.setPhone(employee.getPhone());
            emp.setEmail(employee.getEmail());
            emp.setDepartment(employee.getDepartment());
            emp.setSalary(employee.getSalary());
            emp.setHireDate(employee.getHireDate());
            return employeeRepository.save(emp);
        }
        throw new RuntimeException("Employee not found with ID: " + id);
    }

    @Override
    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Employee> findByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }
}