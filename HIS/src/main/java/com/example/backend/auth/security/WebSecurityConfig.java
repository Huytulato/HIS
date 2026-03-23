package com.example.backend.auth.security;

import com.example.backend.auth.security.jwt.AuthEntryPointJwt;
import com.example.backend.auth.security.jwt.AuthTokenFilter;
import com.example.backend.auth.security.services.UserDetailsServiceImpl;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(
      userDetailsService
    );
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration authConfig
  ) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    // Cho phép Frontend ở cổng 5173 truy cập
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    // Cho phép các method HTTP
    configuration.setAllowedMethods(
      Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")
    );
    // Cho phép các headers (bao gồm Authorization để gửi JWT)
    configuration.setAllowedHeaders(
      Arrays.asList("Authorization", "Content-Type", "Accept")
    );
    // Cho phép gửi credentials (nếu bạn dùng cookie hoặc session)
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source =
      new UrlBasedCorsConfigurationSource();
    // Áp dụng cấu hình này cho mọi API
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .cors(Customizer.withDefaults())
      .csrf(csrf -> csrf.disable())
      .exceptionHandling(exception ->
        exception.authenticationEntryPoint(unauthorizedHandler)
      )
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .authorizeHttpRequests(auth ->
        auth
          .requestMatchers("/api/auth/**")
          .permitAll()
          .requestMatchers("/api/test/**")
          .permitAll()
          .requestMatchers("/v3/api-docs/**", "/swagger-ui/**")
          .permitAll()
          .requestMatchers("/error")
          .permitAll()
          .anyRequest()
          .authenticated()
      );

    http.authenticationProvider(authenticationProvider());

    http.addFilterBefore(
      authenticationJwtTokenFilter(),
      UsernamePasswordAuthenticationFilter.class
    );

    return http.build();
  }
}
