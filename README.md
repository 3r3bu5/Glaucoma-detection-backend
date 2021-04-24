## API Documentation
How to use the API ?
> https://app.swaggerhub.com/apis-docs/3r3bu5/glac-server/1.0

API Server
> https://glac-detect.herokuapp.com
## To do

#### DB

    [x] 1. DB configuration
    [x] 2. User Model
    [x] 3. Token Model
    [x] 4. Patient Model
    [x] 5. Scan Model
    [x] 6. Audit Model

#### Routes

    [x] 1. User
    [x] 2. Patient
    [x] 3. Scan
    [x] 3. Checkout

#### Controllers

    [x] 1. User
      [x] 1.1 Login
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 1.2 Register
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 1.3 verify email address
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 1.4 Resend verfication email address
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 1.5 Get user's credits
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 1.6 Update user's credits
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation

    [x] 2. Patient
      [x] 2.1 Get all patients
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 2.2 Create new patient record
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 2.3 Update patient record
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 2.6 Delete patient record
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 2.3 Get all patient scan history records
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation
      [x] 2.4 Delete patient scan history records
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation

    [x] 3. Scan
      [x] 3.1 Create a new scan for an image
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation

    [x] 4. Checkout
      [x] 4.1 issue a payment intent secret
        - [x] Logging
        - [x] Error handling
        - [X] Auditing
        - [x] Validation

#### Auth

    [x] 1. Local stratgey ( email/password login&signup )
    [x] 2. JWT stratgey (secure endpoints)
    [x] 3. issue JWT (to access secured endpoints)

#### To implement

    [x] 1. rate limit:
       [x] - login/signup
       [x] - verify email address
       [x] - resend verfication email
       [x] - new image scan
    [ ] 2. Upload images to cloud (maybe AWS)?
