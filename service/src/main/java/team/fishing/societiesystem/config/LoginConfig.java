package team.fishing.societiesystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import team.fishing.societiesystem.interceptor.LoginInterceptor;

/**
 * @version V1.0
 * @Title: LoginConfig
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

@Configuration
public class LoginConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("*")
                .excludePathPatterns("/api/society/**","/api/application/**","/api/login/**","/api/hello/**","/api/league/**");
                //.addPathPatterns("/league/**,/admin/**,/logout/");
                //.excludePathPatterns("/test/login");
    }

}



