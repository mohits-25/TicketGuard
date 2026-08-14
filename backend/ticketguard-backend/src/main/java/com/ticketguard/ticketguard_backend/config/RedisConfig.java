package com.ticketguard.ticketguard_backend.config;

import com.ticketguard.ticketguard_backend.event.dto.EventResponse;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisCacheManager cacheManager(
            RedisConnectionFactory redisConnectionFactory) {

        JacksonJsonRedisSerializer<VenueResponse> venueSerializer =
                new JacksonJsonRedisSerializer<>(
                        VenueResponse.class
                );

        RedisCacheConfiguration venueCacheConfiguration =
                RedisCacheConfiguration
                        .defaultCacheConfig()
                        .entryTtl(Duration.ofMinutes(30))
                        .serializeValuesWith(
                                RedisSerializationContext.SerializationPair
                                        .fromSerializer(venueSerializer)
                        );

        JacksonJsonRedisSerializer<EventResponse> eventSerializer =
                new JacksonJsonRedisSerializer<>(
                        EventResponse.class
                );

        RedisCacheConfiguration eventCacheConfiguration =
                RedisCacheConfiguration
                        .defaultCacheConfig()
                        .entryTtl(Duration.ofMinutes(30))
                        .serializeValuesWith(
                                RedisSerializationContext.SerializationPair
                                        .fromSerializer(eventSerializer)
                        );

        return RedisCacheManager.builder(
                        redisConnectionFactory
                )
                .withCacheConfiguration(
                        "events",
                        eventCacheConfiguration
                )
                .withCacheConfiguration(
                        "venues",
                        venueCacheConfiguration
                )
                .build();
    }
}