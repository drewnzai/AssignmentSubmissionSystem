package com.andrew.AssignmentSubmission.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI myOpenAPI(){

        Contact contact = new Contact();
        contact.setEmail("andrewnzai@outlook.com");
        contact.setName("Andrew Kombe");


        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("Assignment Submission API")
                .version("1.0")
                .contact(contact)
                .description("This API exposes backend endpoints.")
                .license(mitLicense);

        return new OpenAPI().info(info);
    }
}
