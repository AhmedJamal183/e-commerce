const express = require('express')
const { Pool } = require('pg'); 
const app = express()
const port = 8080

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });
  
  app.use(express.json());

  async function createSchema() {
    try {
      const query = `
        CREATE SCHEMA IF NOT EXISTS "e-commerce";
      `;
  
      await pool.query(query);
      console.log('E-Commerce schema created');
    } catch (err) {
      console.error(err);
      console.error('E-Commerce schema creation failed');
    }
  }

  async function createProductsTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS "e-commerce"."products" (
          productId SERIAL PRIMARY KEY,
          productTitle VARCHAR(255) NOT NULL,
          productPrice NUMERIC(10, 2)
        );
      `;
  
      await pool.query(query);
      console.log('Products table created');
    } catch (err) {
      console.error(err);
      console.error('Products table creation failed');
    }
  }

  async function createOrdersTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS "e-commerce"."orders" (
          orderId SERIAL PRIMARY KEY,
          productId INTEGER REFERENCES "e-commerce"."products" (productId),
          orderQuantity INTEGER
        );
      `;
  
      await pool.query(query);
      console.log('Orders table created');
    } catch (err) {
      console.error(err);
      console.error('Orders table creation failed');
    }
  }
  
  createSchema();
  createProductsTable();
  createOrdersTable();
  