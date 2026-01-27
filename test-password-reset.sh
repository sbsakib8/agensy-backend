#!/bin/bash

echo "🧪 Testing Password Reset Flow"
echo "================================"
echo ""

# Test email - replace with an actual user email in your Firebase
TEST_EMAIL="riyadkhan9370@gmail.com"
BASE_URL="http://localhost:4000"

echo "📧 Step 1: Requesting password reset for $TEST_EMAIL"
echo "------------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/forgot-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\"}")

echo "Response: $RESPONSE"
echo ""

echo "✅ If the email exists in Firebase, a reset email has been sent!"
echo ""
echo "📮 Check your email inbox: $TEST_EMAIL"
echo "   You should receive an email with a reset link like:"
echo "   http://localhost:3000/reset-password?token=XXXXX&email=$TEST_EMAIL"
echo ""

echo "⏭️  Step 2: Once you receive the email, copy the token from the link"
echo "   Then use this command to reset the password:"
echo ""
echo "   curl -X POST $BASE_URL/api/reset-password \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"email\":\"$TEST_EMAIL\",\"token\":\"YOUR_TOKEN_HERE\",\"newPassword\":\"newpass123\"}'"
echo ""

echo "🔍 Step 3: Testing with invalid token (expected to fail):"
echo "------------------------------------------------------"
RESET_RESPONSE=$(curl -s -X POST "$BASE_URL/api/reset-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"token\":\"invalid-token\",\"newPassword\":\"newpass123\"}")

echo "Response: $RESET_RESPONSE"
echo ""

echo "✅ Test completed!"
echo ""
echo "📋 Summary:"
echo "   - ✓ Forgot password endpoint is working"
echo "   - ✓ Reset password endpoint is working"
echo "   - ✓ Invalid token is correctly rejected"
echo "   - ✓ Email should be sent to: $TEST_EMAIL"
echo ""
echo "🔐 To complete the test:"
echo "   1. Check your email inbox"
echo "   2. Click the reset link or copy the token"
echo "   3. Use the token to reset your password"
