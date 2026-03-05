#!/bin/bash

# Authentication System Test Script
# Tests the complete authentication flow

echo "🔐 Testing Subtitle AI Authentication System"
echo "============================================"

# Configuration
BACKEND_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test user data
TEST_NAME="Test User"
TEST_EMAIL="test-$(date +%s)@example.com"
TEST_PASSWORD="password123"

echo -e "${YELLOW}📋 Test Configuration:${NC}"
echo "Backend URL: $BACKEND_URL"
echo "Test Email: $TEST_EMAIL"
echo ""

# Function to check if backend is running
check_backend() {
    echo -e "${YELLOW}🔍 Checking if backend is running...${NC}"
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is running${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend is not running${NC}"
        echo -e "${YELLOW}💡 Start backend with: cd backend && npm run dev${NC}"
        return 1
    fi
}

# Function to check if frontend is running
check_frontend() {
    echo -e "${YELLOW}🔍 Checking if frontend is running...${NC}"
    if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend is running${NC}"
        return 0
    else
        echo -e "${RED}❌ Frontend is not running${NC}"
        echo -e "${YELLOW}💡 Start frontend with: cd frontend && npm run dev${NC}"
        return 1
    fi
}

# Test user registration
test_registration() {
    echo -e "${YELLOW}📝 Testing user registration...${NC}"

    response=$(curl -s -X POST "$BACKEND_URL/api/auth/signup" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$TEST_NAME\",\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")

    if echo "$response" | grep -q "User created successfully"; then
        echo -e "${GREEN}✅ Registration successful${NC}"

        # Extract token for later use
        TOKEN=$(echo "$response" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
        echo "Token: ${TOKEN:0:20}..."

        return 0
    else
        echo -e "${RED}❌ Registration failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Test user login
test_login() {
    echo -e "${YELLOW}🔑 Testing user login...${NC}"

    response=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")

    if echo "$response" | grep -q "Login successful"; then
        echo -e "${GREEN}✅ Login successful${NC}"

        # Extract token
        TOKEN=$(echo "$response" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
        echo "Token: ${TOKEN:0:20}..."

        return 0
    else
        echo -e "${RED}❌ Login failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Test protected route
test_protected_route() {
    echo -e "${YELLOW}🔒 Testing protected route access...${NC}"

    # First login to get token
    login_response=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")

    TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

    if [ -z "$TOKEN" ]; then
        echo -e "${RED}❌ Could not get token for protected route test${NC}"
        return 1
    fi

    # Test profile endpoint
    profile_response=$(curl -s -X GET "$BACKEND_URL/api/auth/profile" \
        -H "Authorization: Bearer $TOKEN")

    if echo "$profile_response" | grep -q "user"; then
        echo -e "${GREEN}✅ Protected route access successful${NC}"
        return 0
    else
        echo -e "${RED}❌ Protected route access failed${NC}"
        echo "Response: $profile_response"
        return 1
    fi
}

# Test invalid login
test_invalid_login() {
    echo -e "${YELLOW}🚫 Testing invalid login...${NC}"

    response=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email":"nonexistent@example.com","password":"wrongpassword"}')

    if echo "$response" | grep -q "Invalid email or password"; then
        echo -e "${GREEN}✅ Invalid login properly rejected${NC}"
        return 0
    else
        echo -e "${RED}❌ Invalid login not properly rejected${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Test duplicate registration
test_duplicate_registration() {
    echo -e "${YELLOW}👥 Testing duplicate registration...${NC}"

    response=$(curl -s -X POST "$BACKEND_URL/api/auth/signup" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"Another User\",\"email\":\"$TEST_EMAIL\",\"password\":\"differentpassword\"}")

    if echo "$response" | grep -q "already exists"; then
        echo -e "${GREEN}✅ Duplicate registration properly rejected${NC}"
        return 0
    else
        echo -e "${RED}❌ Duplicate registration not properly rejected${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Main test execution
main() {
    echo ""

    # Check if services are running
    if ! check_backend; then
        exit 1
    fi

    if ! check_frontend; then
        echo -e "${YELLOW}⚠️  Frontend not running, but continuing with backend tests${NC}"
    fi

    echo ""
    echo -e "${YELLOW}🧪 Running Authentication Tests${NC}"
    echo "=================================="

    # Run tests
    PASSED=0
    TOTAL=0

    ((TOTAL++))
    if test_registration; then
        ((PASSED++))
    fi

    echo ""

    ((TOTAL++))
    if test_login; then
        ((PASSED++))
    fi

    echo ""

    ((TOTAL++))
    if test_protected_route; then
        ((PASSED++))
    fi

    echo ""

    ((TOTAL++))
    if test_invalid_login; then
        ((PASSED++))
    fi

    echo ""

    ((TOTAL++))
    if test_duplicate_registration; then
        ((PASSED++))
    fi

    echo ""
    echo -e "${YELLOW}📊 Test Results: $PASSED/$TOTAL tests passed${NC}"

    if [ $PASSED -eq $TOTAL ]; then
        echo -e "${GREEN}🎉 All authentication tests passed!${NC}"
        echo ""
        echo -e "${GREEN}🚀 Your authentication system is working correctly!${NC}"
        echo ""
        echo -e "${YELLOW}Next steps:${NC}"
        echo "1. Visit http://localhost:3000/signup to register a user"
        echo "2. Visit http://localhost:3000/login to log in"
        echo "3. Access http://localhost:3000/dashboard (protected route)"
        echo ""
        echo -e "${YELLOW}📖 Documentation: AUTHENTICATION_SYSTEM.md${NC}"
    else
        echo -e "${RED}❌ Some tests failed. Check the output above for details.${NC}"
        echo -e "${YELLOW}💡 Check AUTHENTICATION_SYSTEM.md for troubleshooting${NC}"
        exit 1
    fi
}

# Run main function
main