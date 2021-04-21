## To do

#### DB

    [x] 1. DB configuration
    [x] 2. User Model
    [x] 3. Token Model
    [4] 3. Patient Model
    [5] 3. Image Model

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
        - [ ] Auditing
        - [ ] Validation
      [x] 1.2 Register
        - [x] Logging
        - [x] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 1.3 Verfiy email address
        - [x] Logging
        - [x] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 1.4 Resend verfication email address
        - [x] Logging
        - [x] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 1.5 Get user's credits
        - [x] Logging
        - [x] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 1.6 Update user's credits
        - [x] Logging
        - [x] Error handling
        - [ ] Auditing
        - [ ] Validation

    [x] 2. Patient
      [x] 2.1 Get all patients
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 2.2 Create new patient record
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 2.3 Update patient record
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 2.6 Delete patient record
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 2.3 Get all patient scan history records
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation
      [x] 2.4 Delete all patient scan history records
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation

    [x] 3. Scan
      [x] 3.1 Create a new scan for an image
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation

    [x] 4. Checkout
      [x] 4.1 issue a payment intent secret
        - [ ] Logging
        - [ ] Error handling
        - [ ] Auditing
        - [ ] Validation

#### Auth

    [x] 1. Local stratgey ( email/password login&signup )
    [x] 2. JWT stratgey (secure endpoints)
    [x] 3. issue JWT (to access secured endpoints)

#### To implement

    [ ] 1. rate limit:
       [ ] - login/signup
       [ ] - resend verfication email

    [ ] 2. Upload images to cloud (maybe AWS)?
