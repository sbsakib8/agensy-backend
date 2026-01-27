#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:4000"

echo "=========================================="
echo "Testing Authentication & User APIs"
echo "=========================================="
echo ""

# Test 1: Register a new user
echo -e "${YELLOW}1. POST /api/register-cookie${NC}"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/api/register-cookie \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "testuser'$(date +%s)'@example.com",
    "password": "TestPassword123!",
    "displayName": "Test User"
  }')
echo "$REGISTER_RESPONSE"
echo ""

# Test 2: Login
echo -e "${YELLOW}2. POST /api/login-cookie${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/login-cookie \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123!"
  }')
echo "$LOGIN_RESPONSE"
echo ""

# Test 3: Get Profile (with cookie)
echo -e "${YELLOW}3. GET /api/profile (with session)${NC}"
PROFILE_RESPONSE=$(curl -s $BASE_URL/api/profile -b cookies.txt)
echo "$PROFILE_RESPONSE"
echo ""

# Test 4: Get Me (with cookie)
echo -e "${YELLOW}4. GET /api/me (with session)${NC}"
ME_RESPONSE=$(curl -s $BASE_URL/api/me -b cookies.txt)
echo "$ME_RESPONSE"
echo ""

# Test 5: Get Users (with cookie)
echo -e "${YELLOW}5. GET /api/users (with session)${NC}"
USERS_RESPONSE=$(curl -s $BASE_URL/api/users -b cookies.txt)
echo "$USERS_RESPONSE"
echo ""

# Test 6: Forgot Password
echo -e "${YELLOW}6. POST /api/forgot-password${NC}"
FORGOT_RESPONSE=$(curl -s -X POST $BASE_URL/api/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com"
  }')
echo "$FORGOT_RESPONSE"
echo ""

# Test 7: Logout
echo -e "${YELLOW}7. POST /api/logout${NC}"
LOGOUT_RESPONSE=$(curl -s -X POST $BASE_URL/api/logout -b cookies.txt)
echo "$LOGOUT_RESPONSE"
echo ""

# Test 8: Profile after logout (should fail)
echo -e "${YELLOW}8. GET /api/profile (after logout - should fail)${NC}"
PROFILE_AFTER_LOGOUT=$(curl -s $BASE_URL/api/profile)
echo "$PROFILE_AFTER_LOGOUT"
echo ""

# Test 9: User Management endpoints (without auth - should fail)
echo -e "${YELLOW}9. GET /api/user-management (without auth - should fail)${NC}"
USER_MGMT_RESPONSE=$(curl -s $BASE_URL/api/user-management)
echo "$USER_MGMT_RESPONSE"
echo ""

# Clean up
rm -f cookies.txt

echo "=========================================="
echo -e "${GREEN}Testing Complete!${NC}"
echo "=========================================="
