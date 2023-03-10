package payroll;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.List;
import java.io.InputStream;
import java.io.IOException;


@Configuration
class LoadDatabase {

	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

	@Bean
	CommandLineRunner initDatabase(EmployeeRepository repository) {

		return args -> {
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Employee>> typeReference = new TypeReference<List<Employee>>(){};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/json/employees.json");
			try {
				List<Employee> employees = mapper.readValue(inputStream, typeReference);
				repository.saveAll(employees);
				log.info("Loaded " + employees.size() + " employees from JSON file");
			} catch (IOException e){
				log.error("Unable to load employees from JSON file: " + e.getMessage());
			}
		};
	}
}
