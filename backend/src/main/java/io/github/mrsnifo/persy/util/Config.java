package io.github.mrsnifo.persy.util;

public class Config {
    public static final String DB_URL = System.getenv("DB_URL");
    public static final String DB_USER = System.getenv("DB_USER");
    public static final String DB_PASSWORD = System.getenv("DB_PASSWORD");
    public static final int SERVER_PORT = Integer.parseInt(System.getenv("SERVER_PORT"));
}
