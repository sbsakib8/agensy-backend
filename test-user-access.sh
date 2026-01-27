#!/bin/bash

echo "======================================"
echo "Testing User Access with Authentication"
echo "======================================"
echo ""

BASE_URL="http://localhost:4000"
USER_UID="m5eAYdYX6dYxpgr1ouiSakvhMrh1"

# Test 1: Without authentication (should fail with 401)
echo "1. GET /api/users/$USER_UID (without auth - should fail)"
curl -s $BASE_URL/api/users/$USER_UID | jq .
echo ""

# Test 2: Login first to get session cookie
echo "2. Login to get session cookie"
echo "Please enter email:"
read -r EMAIL
echo "Please enter password:"
read -rs PASSWORD
echo ""

LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/login-cookie \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")
echo "$LOGIN_RESPONSE" | jq .
echo ""

# Extract UID from login response
LOGGED_IN_UID=$(echo "$LOGIN_RESPONSE" | jq -r '.uid')
echo "Logged in as UID: $LOGGED_IN_UID"
echo ""

# Test 3: Access own user data (should succeed)
echo "3. GET /api/users/$LOGGED_IN_UID (with session cookie - should succeed)"
curl -s $BASE_URL/api/users/$LOGGED_IN_UID -b cookies.txt | jq .
echo ""

# Test 4: Try to access different user (should fail with 403)
if [ "$LOGGED_IN_UID" != "$USER_UID" ]; then
  echo "4. GET /api/users/$USER_UID (different user - should fail)"
  curl -s $BASE_URL/api/users/$USER_UID -b cookies.txt | jq .
  echo ""
fi

# Cleanup
rm -f cookies.txt

echo "======================================"
echo "Testing Complete"
echo "======================================"
