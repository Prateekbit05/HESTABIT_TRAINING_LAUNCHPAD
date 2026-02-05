# QUERY-ENGINE-DOC.md

## Table of Contents
1. [Overview](#overview)
2. [Query Features](#query-features)
3. [API Endpoints](#api-endpoints)
4. [Query Parameters](#query-parameters)
5. [Filtering](#filtering)
6. [Searching](#searching)
7. [Sorting](#sorting)
8. [Pagination](#pagination)
9. [Field Selection](#field-selection)
10. [Soft Deletes](#soft-deletes)
11. [Examples](#examples)
12. [Performance Optimization](#performance-optimization)

---

## Overview

The Advanced Query Engine provides a powerful, flexible way to query resources through REST API endpoints. It supports complex filtering, full-text search, sorting, pagination, field selection, and soft delete management.

### Key Features
**Dynamic Filtering** - Filter by any field with comparison operators  
**Full-Text Search** - Search across multiple fields  
**Flexible Sorting** - Sort by one or multiple fields  
**Efficient Pagination** - Cursor and offset-based pagination  
**Field Selection** - Request only needed fields  
**Soft Delete Support** - Include or exclude deleted records  
**Compound Queries** - Combine multiple query features  

### Supported Resources
- **Users** (`/api/v1/users`)
- **Products** (`/api/v1/products`)

---

## Query Features

### Feature Matrix

| Feature | Endpoint | Description | Example |
|---------|----------|-------------|---------|
| **Filtering** | All | Filter by field values | `?status=active` |
| **Range Filtering** | All | Filter by ranges | `?price[gte]=100&price[lte]=500` |
| **Search** | All | Full-text search | `?search=laptop` |
| **Sorting** | All | Order results | `?sort=price,-createdAt` |
| **Pagination** | All | Limit results | `?page=2&limit=20` |
| **Field Selection** | All | Choose fields | `?fields=name,price,category` |
| **Soft Deletes** | All | Include deleted | `?includeDeleted=true` |
| **Category Filter** | Products | Filter by category | `?category=electronics` |
| **Tag Filter** | Products | Filter by tags | `?tags=apple,samsung` |
| **Featured Filter** | Products | Only featured items | `?featured=true` |
| **Price Range** | Products | Price filtering | `?minPrice=100&maxPrice=500` |

---

## API Endpoints

### Products API

#### Base Endpoint
```
GET /api/v1/products
```

#### Available Routes
```
GET    /api/v1/products              # Get all products (with queries)
GET    /api/v1/products/:id          # Get single product
GET    /api/v1/products/search       # Search products
GET    /api/v1/products/featured     # Get featured products
POST   /api/v1/products              # Create product (admin)
PUT    /api/v1/products/:id          # Update product (admin)
DELETE /api/v1/products/:id          # Soft delete product (admin)
```

### Users API

#### Base Endpoint
```
GET /api/v1/users
```

#### Available Routes
```
GET    /api/v1/users                 # Get all users (admin)
GET    /api/v1/users/:id             # Get single user
GET    /api/v1/users/me              # Get current user profile
PUT    /api/v1/users/:id             # Update user
DELETE /api/v1/users/:id             # Soft delete user (admin)
```

---

## Query Parameters

### Basic Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | Integer | Page number (default: 1) | `?page=2` |
| `limit` | Integer | Items per page (default: 10, max: 100) | `?limit=20` |
| `sort` | String | Sort fields (comma-separated) | `?sort=price,-createdAt` |
| `fields` | String | Fields to include (comma-separated) | `?fields=name,price` |
| `search` | String | Search query | `?search=laptop` |

### Product-Specific Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `category` | String | Filter by category | `?category=electronics` |
| `tags` | String | Filter by tags (comma-separated) | `?tags=apple,samsung` |
| `brand` | String | Filter by brand | `?brand=apple` |
| `minPrice` | Number | Minimum price | `?minPrice=100` |
| `maxPrice` | Number | Maximum price | `?maxPrice=500` |
| `featured` | Boolean | Only featured products | `?featured=true` |
| `inStock` | Boolean | Only in-stock products | `?inStock=true` |
| `status` | String | Product status | `?status=active` |
| `includeDeleted` | Boolean | Include soft-deleted items | `?includeDeleted=true` |

---

## Filtering

### Exact Match Filtering

Filter by exact field values:

```http
GET /api/v1/products?status=active
GET /api/v1/products?category=electronics
GET /api/v1/products?brand=apple
```

### Range Filtering (Comparison Operators)

Use MongoDB comparison operators:

| Operator | Description | Example |
|----------|-------------|---------|
| `[gte]` | Greater than or equal | `?price[gte]=100` |
| `[gt]` | Greater than | `?price[gt]=99` |
| `[lte]` | Less than or equal | `?price[lte]=500` |
| `[lt]` | Less than | `?price[lt]=501` |

**Examples**:
```http
# Products between $100 and $500
GET /api/v1/products?price[gte]=100&price[lte]=500

# Products created after January 1, 2024
GET /api/v1/products?createdAt[gte]=2024-01-01

# Products with stock greater than 10
GET /api/v1/products?stock[gt]=10
```

### Multiple Field Filtering

Combine multiple filters (AND logic):

```http
# Active electronics under $1000
GET /api/v1/products?category=electronics&status=active&price[lt]=1000

# Featured products in clothing category
GET /api/v1/products?category=clothing&featured=true
```

### Array Filtering (Tags)

Filter by multiple tags (OR logic):

```http
# Products with apple OR samsung tags
GET /api/v1/products?tags=apple,samsung

# Products with specific tags
GET /api/v1/products?tags=wireless,bluetooth,headphones
```

---

## Searching

### Full-Text Search

The search feature uses MongoDB text indexes for efficient full-text search across multiple fields.

**Product Search Fields**:
- `name` (weight: 10)
- `tags` (weight: 5)
- `brand` (weight: 3)
- `description` (weight: 1)

**Search Endpoint**:
```http
GET /api/v1/products/search?search={query}
```

**Examples**:
```http
# Search for "laptop"
GET /api/v1/products/search?search=laptop

# Search for "wireless headphones"
GET /api/v1/products/search?search=wireless%20headphones

# Search with additional filters
GET /api/v1/products/search?search=phone&category=electronics&price[lte]=800
```

### Search with Regex (Alternative)

Using the main endpoint with search parameter:

```http
GET /api/v1/products?search=iphone
```

This performs a case-insensitive regex search on:
- Product name
- Description
- Brand
- Tags

**Implementation**:
```javascript
const searchQuery = {
  $or: [
    { name: { $regex: searchTerm, $options: 'i' } },
    { description: { $regex: searchTerm, $options: 'i' } },
    { brand: { $regex: searchTerm, $options: 'i' } },
    { tags: { $in: [new RegExp(searchTerm, 'i')] } }
  ]
};
```

---

## Sorting

### Single Field Sorting

```http
# Sort by price (ascending)
GET /api/v1/products?sort=price

# Sort by price (descending)
GET /api/v1/products?sort=-price

# Sort by creation date (newest first)
GET /api/v1/products?sort=-createdAt
```

### Multi-Field Sorting

Combine multiple sort fields (comma-separated):

```http
# Sort by featured (desc), then price (asc)
GET /api/v1/products?sort=-featured,price

# Sort by status (asc), category (asc), price (desc)
GET /api/v1/products?sort=status,category,-price
```

**Prefix with `-` for descending order**

### Sort Options

| Field | Description | Example |
|-------|-------------|---------|
| `price` | Product price | `?sort=price` |
| `-price` | Price descending | `?sort=-price` |
| `createdAt` | Creation date | `?sort=createdAt` |
| `-createdAt` | Newest first | `?sort=-createdAt` |
| `name` | Alphabetical | `?sort=name` |
| `stock` | Stock quantity | `?sort=-stock` |
| `ratings.average` | Average rating | `?sort=-ratings.average` |

---

## Pagination

### Offset-Based Pagination

**Default Behavior**:
- Default page: `1`
- Default limit: `10`
- Maximum limit: `100`

**Parameters**:
```http
GET /api/v1/products?page=1&limit=20
```

**Response Format**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8,
      "hasMore": true
    }
  }
}
```

### Pagination Examples

```http
# First page (20 items)
GET /api/v1/products?page=1&limit=20

# Second page
GET /api/v1/products?page=2&limit=20

# Get all items (up to max limit)
GET /api/v1/products?limit=100

# Third page with sorting
GET /api/v1/products?page=3&limit=10&sort=-createdAt
```

### Pagination Metadata

Response includes:
- `page` - Current page number
- `limit` - Items per page
- `total` - Total number of items
- `pages` - Total number of pages
- `hasMore` - Boolean indicating if more pages exist

---

## Field Selection

### Selecting Specific Fields

Request only the fields you need to reduce payload size:

```http
# Only name and price
GET /api/v1/products?fields=name,price

# Name, price, and category
GET /api/v1/products?fields=name,price,category

# All fields except description
GET /api/v1/products?fields=-description
```

**Benefits**:
- Reduced bandwidth
- Faster response times
- Less data to process on client

**Default Behavior**:
- If no `fields` parameter: all fields returned
- `__v` field excluded by default

### Field Selection Examples

```http
# Minimal product listing
GET /api/v1/products?fields=name,price,images

# Product cards view
GET /api/v1/products?fields=name,price,category,images,ratings

# Admin view (all fields)
GET /api/v1/products

# Exclude sensitive/large fields
GET /api/v1/products?fields=-description,-metadata
```

---

## Soft Deletes

### Default Behavior

By default, soft-deleted items are **excluded** from queries.

```http
# Returns only active (non-deleted) products
GET /api/v1/products
```

### Including Deleted Items

Add `includeDeleted=true` to include soft-deleted items:

```http
# Returns all products including deleted ones
GET /api/v1/products?includeDeleted=true

# Deleted items have deletedAt field populated
{
  "name": "Product Name",
  "deletedAt": "2025-02-01T10:00:00.000Z"
}
```

### Soft Delete Implementation

**Delete Operation**:
```http
DELETE /api/v1/products/:id
```

**Sets**:
- `deletedAt` = current timestamp
- `status` = 'archived'

**Restore Operation** (Admin):
```javascript
// Unsets deletedAt field
Product.restore(productId);
```

---

## Examples

### Example 1: Basic Product Listing

**Request**:
```http
GET /api/v1/products?page=1&limit=10&sort=-createdAt
```

**Response**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "iPhone 15 Pro",
        "price": 999,
        "category": "electronics",
        "brand": "Apple",
        "status": "active",
        "createdAt": "2025-02-04T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15,
      "hasMore": true
    }
  },
  "timestamp": "2025-02-04T12:00:00.000Z"
}
```

---

### Example 2: Advanced Filtering

**Request**:
```http
GET /api/v1/products?category=electronics&price[gte]=100&price[lte]=500&brand=apple&status=active&sort=price&page=1&limit=20
```

**Explanation**:
- Category: electronics
- Price: $100 - $500
- Brand: Apple
- Status: active only
- Sort: by price (ascending)
- Page: 1, Limit: 20

---

### Example 3: Search with Filters

**Request**:
```http
GET /api/v1/products/search?search=wireless%20headphones&price[lte]=200&sort=-ratings.average&limit=5
```

**Explanation**:
- Search: "wireless headphones"
- Max price: $200
- Sort: by rating (highest first)
- Limit: 5 results

---

### Example 4: Featured Products

**Request**:
```http
GET /api/v1/products/featured?limit=10
```

**Response**:
```json
{
  "success": true,
  "message": "Featured products retrieved successfully",
  "data": [
    {
      "name": "MacBook Pro 16",
      "price": 2499,
      "featured": true,
      "ratings": { "average": 4.8, "count": 250 }
    }
  ]
}
```

---

### Example 5: Complex Query

**Request**:
```http
GET /api/v1/products?category=electronics&tags=wireless,bluetooth&price[gte]=50&price[lte]=300&inStock=true&sort=-featured,-ratings.average,price&fields=name,price,brand,ratings,images&page=1&limit=20
```

**Breakdown**:
- **Category**: electronics
- **Tags**: wireless OR bluetooth
- **Price**: $50 - $300
- **Stock**: In stock only
- **Sort**: 
  1. Featured first
  2. Then by rating (highest)
  3. Then by price (lowest)
- **Fields**: name, price, brand, ratings, images
- **Pagination**: Page 1, 20 items

---

### Example 6: User Queries

**Request**:
```http
GET /api/v1/users?status=active&role=user&sort=-lastLogin&page=1&limit=50
```

**Explanation**:
- Active users only
- Role: regular users
- Sort: by last login (recent first)
- 50 users per page

---

## Performance Optimization

### Index Strategy

**Indexes Created**:

#### Product Model
```javascript
// Compound indexes
{ status: 1, createdAt: -1 }
{ category: 1, status: 1 }
{ featured: 1, status: 1, createdAt: -1 }

// Single field indexes
{ price: 1 }
{ deletedAt: 1 } // sparse

// Text index for search
{ name: 'text', description: 'text', tags: 'text', brand: 'text' }
```

#### User Model
```javascript
// Compound indexes
{ status: 1, createdAt: -1 }

// Single field indexes
{ email: 1 } // unique
{ deletedAt: 1 } // sparse

// Text index
{ firstName: 'text', lastName: 'text', email: 'text' }
```

### Query Optimization Tips

1. **Use Indexed Fields**
   - Always filter/sort by indexed fields
   - Current indexed fields: status, createdAt, category, price, email

2. **Limit Fields**
   - Use `?fields=` to request only needed fields
   - Reduces bandwidth and processing time

3. **Pagination**
   - Keep `limit` reasonable (10-50 items)
   - Use `limit=100` sparingly

4. **Avoid**
   - Filtering by non-indexed fields
   - Large skip values (use cursor pagination for large datasets)
   - Requesting all fields when only few are needed

5. **Recommended Patterns**
   ```http
   # Good - Uses indexes
   GET /api/v1/products?category=electronics&status=active&sort=-createdAt
   
   # Less optimal - Large skip
   GET /api/v1/products?page=1000&limit=10
   
   # Better - Use cursor-based pagination (future)
   GET /api/v1/products?after=cursor_id&limit=10
   ```

---

## Query Builder Service

### Implementation

The QueryBuilderService class handles dynamic query construction:

```javascript
class QueryBuilderService {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Remove special params
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search(fields = []) {
    if (this.queryString.search && fields.length > 0) {
      const searchRegex = new RegExp(this.queryString.search, 'i');
      const searchQuery = {
        $or: fields.map(field => ({ [field]: searchRegex }))
      };
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
```

### Usage in Service Layer

```javascript
// In product.service.js
async getAllProducts(queryParams) {
  const features = new QueryBuilderService(
    Product.find({ status: 'active' }),
    queryParams
  )
    .filter()
    .search(['name', 'description', 'brand'])
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  const total = await Product.countDocuments({ status: 'active' });

  return {
    data: products,
    total,
    page: parseInt(queryParams.page) || 1,
    limit: parseInt(queryParams.limit) || 10,
  };
}
```

---

## Error Handling

### Query Validation Errors

**Invalid Parameter Values**:
```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": ["price must be a number"]
}
```

**Invalid Operators**:
```http
GET /api/v1/products?price[invalid]=100
# Returns 400 Bad Request
```

**Page Out of Range**:
```http
GET /api/v1/products?page=999999
# Returns empty array with correct pagination info
```

---

## Rate Limiting

Query endpoints are subject to rate limiting:

**Limits**:
- **Global**: 100 requests per 15 minutes
- **Search**: Same as global
- **Authenticated**: Higher limits for authenticated users

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1612444800
```

---

## Best Practices

### 1. Query Construction
**DO**:
- Use indexed fields for filtering
- Combine related filters in single request
- Use field selection to reduce payload
- Keep limit reasonable (10-50)

**DON'T**:
- Filter by non-indexed fields frequently
- Request all data when paginating
- Use very large limit values
- Chain excessive filters

### 2. Search
**DO**:
- Use specific search terms
- Combine search with filters
- Use dedicated search endpoint for full-text

**DON'T**:
- Search with single character
- Search without any filters on large datasets

### 3. Pagination
**DO**:
- Always include page and limit
- Check `hasMore` for next page
- Use appropriate limit for use case

**DON'T**:
- Request page 1 with limit=10000
- Use large skip values (> 10000)

### 4. Sorting
**DO**:
- Sort by indexed fields
- Combine with pagination
- Use multi-field sorting wisely

**DON'T**:
- Sort by computed/virtual fields
- Sort without pagination

---

## API Versioning

Current version: **v1**

All endpoints are prefixed with `/api/v1/`

Future versions will maintain backward compatibility.

---

## Changelog

### Version 1.0 (Current)
- Basic CRUD operations
- Advanced filtering with comparison operators
- Full-text search
- Multi-field sorting
- Offset-based pagination
- Field selection
- Soft delete support
- Query builder service

### Planned Features
- [ ] Cursor-based pagination
- [ ] Aggregation endpoints
- [ ] Bulk operations
- [ ] Query caching
- [ ] GraphQL support

---


