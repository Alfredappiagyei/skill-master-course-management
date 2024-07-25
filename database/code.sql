-- this file cotains the 
-- TRIGGERS and PROCEDURES and CURSORS for INSERTING AND RETRIEVING INFORMATION
-- from the database



-- INSERTING RECORDS WITH STORED PROCEDURES

--create a new employee
CREATE OR REPLACE PROCEDURE new_employee(
    in_employeeFName IN Employee.employeeFName%TYPE,
    in_employeeLName IN Employee.employeeLName%TYPE,
    in_employeeEmail IN Employee.employeeEmail%TYPE,
    in_employeeContact IN Employee.employeeContact%TYPE,
    out_newEmployeeNo OUT Employee.employeeNo%TYPE,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_employeeFName IS NULL OR in_employeeLName IS NULL OR in_employeeEmail IS NULL OR in_employeeContact IS NULL THEN
        out_error_message := 'Missing required field(s).';
        RETURN;
    END IF;

    -- Validate email format
    IF NOT REGEXP_LIKE(in_employeeEmail, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        out_error_message := 'Invalid email format.';
        RETURN;
    END IF;

    BEGIN
        -- Insert new employee
        INSERT INTO Employee(employeeFName, employeeLName, employeeEmail, employeeContact)
        VALUES(in_employeeFName, in_employeeLName, in_employeeEmail, in_employeeContact)
        RETURNING employeeNo INTO out_newEmployeeNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            out_error_message := 'Duplicate employee email. Employee already exists.';
        WHEN OTHERS THEN
            out_error_message := SQLERRM;
    END;
END;
/




--create a new client
CREATE OR REPLACE PROCEDURE new_client(
    in_clientName IN client.clientName%type,
    in_clientEmail IN client.clientEmail%type,
    in_clientContact IN client.clientContact%type,
    out_newclientNo OUT client.clientNo%type,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_clientName IS NULL OR in_clientEmail IS NULL OR in_clientContact IS NULL THEN
        out_error_message := 'Missing required field(s).';
        RETURN;
    END IF;

    -- Validate email format
    IF NOT REGEXP_LIKE(in_clientEmail, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        out_error_message := 'Invalid email format.';
        RETURN;
    END IF;

    BEGIN
        -- Insert new client
        INSERT INTO client(clientName, clientEmail, clientContact)
        VALUES (in_clientName, in_clientEmail, in_clientContact)
        RETURNING clientNo INTO out_newclientNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            out_error_message := 'Duplicate client email. Client already exists.';
        WHEN OTHERS THEN
            out_error_message := SQLERRM;
    END;
END;
/



--create a new delegate

CREATE OR REPLACE PROCEDURE new_delegate(
    in_delegateTitle IN delegate.delegateTitle%type,
    in_delegateFName IN delegate.delegateFName%type,
    in_delegateLName IN delegate.delegateLName%type,
    in_delegateStreet IN delegate.delegateStreet%type,
    in_delegateCity IN delegate.delegateCity%type,
    in_delegateState IN delegate.delegateState%type,
    in_delegateZipCode IN delegate.delegateZipCode%type,
    in_attTelNo IN delegate.attTelNo%type,
    in_attFaxNo IN delegate.attFaxNo%type,
    in_attEmailAddress IN delegate.attEmailAddress%type,
    in_clientNo IN client.clientNo%type,
    out_newdelegateNo OUT delegate.delegateNo%type,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_delegateTitle IS NULL OR
       in_delegateFName IS NULL OR
       in_delegateLName IS NULL OR
       in_delegateCity IS NULL OR
       in_attTelNo IS NULL OR
       in_attEmailAddress IS NULL THEN       
        out_error_message := 'Missing required field(s).';
        RETURN;
    END IF;

    -- Validate email format (you can add more validations here as needed)
    IF NOT REGEXP_LIKE(in_attEmailAddress, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        out_error_message := 'Invalid email format.';
        RETURN;
    END IF;

    BEGIN
        -- Insert new delegate
        INSERT INTO delegate(
            delegateTitle,
            delegateFName,
            delegateLName,
            delegateStreet,
            delegateCity,
            delegateState,
            delegateZipCode,
            attTelNo,
            attFaxNo,
            attEmailAddress,
            clientNo
        )
        VALUES (
            in_delegateTitle,
            in_delegateFName,
            in_delegateLName,
            in_delegateStreet,
            in_delegateCity,
            in_delegateState,
            in_delegateZipCode,
            in_attTelNo,
            in_attFaxNo,
            in_attEmailAddress,
            in_clientNo
        )
        RETURNING delegateNo INTO out_newdelegateNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            out_error_message := 'Duplicate delegate email. Delegate already exists.';
        WHEN OTHERS THEN
        -- Check if the error is related to integrity constraint violation
            IF SQLCODE = -2291 THEN
              out_error_message := 'Client number does not exist. Enter an already existing client number.';
            ELSE
              out_error_message := SQLERRM;
            end if;
    END;

END;
/


-- creating a new course type
CREATE OR REPLACE PROCEDURE new_course_type(
    in_courseTypeDescription IN CourseType.courseTypeDescription%type,
    out_newCourseTypeNo OUT CourseType.courseTypeNo%type,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_courseTypeDescription IS NULL THEN
        out_error_message := 'Missing required field: courseTypeDescription';
        RETURN;
    END IF;

    BEGIN
        -- Insert new course type
        INSERT INTO coursetype (
            courseTypeDescription
        ) VALUES (
            in_courseTypeDescription
        )
        RETURNING courseTypeNo INTO out_newCourseTypeNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN OTHERS THEN
            out_error_message := SQLERRM;
    END;

END;
/


--creating a new course
CREATE OR REPLACE PROCEDURE new_course(
    in_courseName IN course.courseName%TYPE,
    in_courseDescription IN Course.courseDescription%TYPE,
    in_startDate IN course.startDate%TYPE,
    in_startTime IN Course.startTime%TYPE,
    in_endDate IN Course.endDate%TYPE,
    in_endTime IN Course.endTime%TYPE,
    in_maxDelegates IN Course.maxDelegates%TYPE,
    in_confirmed IN Course.confirmed%TYPE,
    in_delivererEmployeeNo IN Course.delivererEmployeeNo%TYPE,
    in_courseTypeNo IN Course.courseTypeNo%TYPE,
    out_newCourseNo OUT Course.courseNo%TYPE,
    out_error_message OUT VARCHAR2
) IS
    v_employee_count NUMBER;
    v_course_type_exist NUMBER;

BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_courseName IS NULL OR
       in_courseDescription IS NULL OR
       in_startDate IS NULL OR
       in_startTime IS NULL OR
       in_endDate IS NULL OR
       in_endTime IS NULL OR
       in_maxDelegates IS NULL OR
       in_confirmed IS NULL OR
       in_delivererEmployeeNo IS NULL OR
       in_courseTypeNo IS NULL THEN
       
        out_error_message := 'Missing required field(s).';
        RETURN;
    END IF;

    -- Check if the delivererEmployeeNo exists
    BEGIN
        SELECT COUNT(*)
        INTO v_employee_count
        FROM Employee
        WHERE employeeNo = in_delivererEmployeeNo;
        
        IF v_employee_count = 0 THEN
            out_error_message := 'Employee number does not exist. Enter an already existing deliverer employee number.';
            RETURN;
        END IF;
    END;

    -- Check if the courseTypeNo exists
    BEGIN
        SELECT COUNT(*)
        INTO v_course_type_exist
        FROM CourseType
        WHERE courseTypeNo = in_courseTypeNo;
        
        IF v_course_type_exist = 0 THEN
            out_error_message := 'Course type number does not exist. Enter an already existing course type number.';
            RETURN;
        END IF;
    END;


    -- Check if the delivererEmployeeNo is already assigned to another course
    BEGIN
        SELECT COUNT(*)
        INTO v_employee_count
        FROM Course
        WHERE delivererEmployeeNo = in_delivererEmployeeNo;
        
        IF v_employee_count > 0 THEN
            out_error_message := 'The selected employee is already assigned to another course.';
            RETURN;
        END IF;
    end;



    BEGIN
        -- Insert new course
        INSERT INTO course (
            courseName,
            courseDescription,
            startDate,
            startTime,
            endDate,
            endTime,
            maxDelegates,
            confirmed,
            delivererEmployeeNo,
            courseTypeNo
        ) VALUES (
            in_courseName,
            in_courseDescription,
            in_startDate,
            in_startTime,
            in_endDate,
            in_endTime,
            in_maxDelegates,
            in_confirmed,
            in_delivererEmployeeNo,
            in_courseTypeNo
        )
        RETURNING courseNo INTO out_newCourseNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE = -2291 THEN
              out_error_message := 'Deliverer Employee number does not exist. Enter an already existing employee number.';
          ELSE
            out_error_message := SQLERRM;
          end if; 
    END;
END;
/


-- creating a course fee
CREATE OR REPLACE PROCEDURE new_course_fee(
    in_feeDescription IN CourseFee.feeDescription%TYPE,
    in_fee IN CourseFee.fee%TYPE,
    in_courseNo IN CourseFee.courseNo%TYPE,
    out_newCourseFeeNo OUT CourseFee.courseFeeNo%TYPE,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_feeDescription IS NULL OR
       in_fee IS NULL OR
       in_courseNo IS NULL THEN
       
        out_error_message := 'Missing required field(s).';
        RETURN;
    END IF;

    BEGIN
        -- Insert new course fee
        INSERT INTO CourseFee (
            feeDescription,
            fee,
            courseNo
        ) VALUES (
            in_feeDescription,
            in_fee,
            in_courseNo
        )
        RETURNING courseFeeNo INTO out_newCourseFeeNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE = -2291 THEN
              out_error_message := 'Course number does not exist. Enter an already existing course number.';
          ELSE
            out_error_message := SQLERRM;
          end if;
            END;

END;
/


-- creating a payment method
CREATE OR REPLACE PROCEDURE new_payment_method(
    in_pMethodName IN PaymentMethod.pMethodName%TYPE,
    out_newPMethodNo OUT PaymentMethod.pMethodNo%TYPE,
    out_error_message OUT VARCHAR2
) IS
BEGIN
    -- Initialize the error message to NULL
    out_error_message := NULL;

    -- Validate input
    IF in_pMethodName IS NULL THEN
        out_error_message := 'Missing required field: pMethodName';
        RETURN;
    END IF;

    BEGIN
        -- Insert new payment method
        INSERT INTO PaymentMethod (
            pMethodName
        ) VALUES (
            in_pMethodName
        )
        RETURNING pMethodNo INTO out_newPMethodNo;
        COMMIT; -- Commit the transaction to make the insertion permanent

    EXCEPTION
        WHEN OTHERS THEN
            out_error_message := SQLERRM;
    END;
END;
/


--creating a new location
CREATE OR REPLACE PROCEDURE NEW_LOCATION (
  in_locationName IN Location.locationName%TYPE,
  in_locationMaxSize IN Location.locationMaxSize%TYPE,
  out_newLocationNo OUT Location.locationNo%TYPE,
  out_error_message OUT VARCHAR2
) IS
BEGIN
  -- Initialize the error message to NULL
  out_error_message := NULL;

  -- Validate input
  IF in_locationName IS NULL OR in_locationMaxSize IS NULL THEN
    out_error_message := 'Missing required field(s)';
    RETURN;
  END IF;

  BEGIN
    -- Insert new location
    INSERT INTO Location (
      locationName,
      locationMaxSize
    ) VALUES (
      in_locationName,
      in_locationMaxSize
    ) RETURNING locationNo INTO out_newLocationNo;
    COMMIT; -- Commit the transaction to make the insertion permanent

  EXCEPTION
    WHEN OTHERS THEN
      out_error_message := SQLERRM;
  END;
END;
/


--creating new registration
CREATE OR REPLACE PROCEDURE NEW_REGISTRATION (
  in_registrationDate IN registration.registrationDate%type,
  in_delegateNo IN registration.delegateNo%type,
  in_courseFeeNo IN registration.courseFeeNo%type,
  in_registerEmployeeNo IN registration.registerEmployeeNo%type,
  in_courseNo IN registration.courseNo%type,
  out_newRegistrationNo OUT Registration.registrationNo%TYPE,
  out_error_message OUT VARCHAR2
) IS
    v_currentDelegates NUMBER;
    v_maxDelegates NUMBER;
    v_course_fee_exists NUMBER;
    v_register_employee_exists NUMBER;
    v_course_exists NUMBER;
BEGIN
  -- Initialize the error message to NULL
  out_error_message := NULL;

  -- Validate input
  IF in_registrationDate IS NULL OR in_delegateNo IS NULL OR in_courseFeeNo IS NULL 
     OR in_registerEmployeeNo IS NULL OR in_courseNo IS NULL THEN
    out_error_message := 'Missing required field(s)';
    RETURN;
  END IF;

  -- Retrieve the current number of delegates registered for the course
  SELECT COUNT(*)
  INTO v_currentDelegates
  FROM Registration
  WHERE courseNo = in_courseNo;

  -- Retrieve the maximum number of delegates allowed for the course
  SELECT maxDelegates
  INTO v_maxDelegates
  FROM Course
  WHERE courseNo = in_courseNo;

  -- Check if the course has reached it's upper limit of delegates
  IF v_currentDelegates >= v_maxDelegates THEN
    out_error_message := 'The course has reached the maximum number of delegates';
    RETURN;
  END IF;

  -- Check if the courseFeeNo exists
  SELECT COUNT(*)
  INTO v_course_fee_exists
  FROM CourseFee
  WHERE courseFeeNo = in_courseFeeNo;

  IF v_course_fee_exists = 0 THEN
    out_error_message := 'Course fee number does not exist. Enter an existing course fee number.';
    RETURN;
  END IF;

  -- Check if the registerEmployeeNo exists
  SELECT COUNT(*)
  INTO v_register_employee_exists
  FROM Employee
  WHERE employeeNo = in_registerEmployeeNo;

  IF v_register_employee_exists = 0 THEN
    out_error_message := 'Register employee number does not exist. Enter an existing register employee number.';
    RETURN;
  END IF;

  -- Check if the courseNo exists
  SELECT COUNT(*)
  INTO v_course_exists
  FROM Course
  WHERE courseNo = in_courseNo;

  IF v_course_exists = 0 THEN
    out_error_message := 'Course number does not exist. Enter an existing course number.';
    RETURN;
  END IF;


  BEGIN
    -- Insert new registration
    INSERT INTO Registration (
      registrationDate,
      delegateNo,
      courseFeeNo,
      registerEmployeeNo,
      courseNo
    ) VALUES (
      in_registrationDate,
      in_delegateNo,
      in_courseFeeNo,
      in_registerEmployeeNo,
      in_courseNo
    ) RETURNING registrationNo INTO out_newRegistrationNo;
    COMMIT; -- Commit the transaction to make the insertion permanent

  EXCEPTION
    WHEN OTHERS THEN
    -- Check if the error is related to integrity constraint violation ( specifically DELEGATE NUMBER)
      IF SQLCODE = -2291 THEN
          out_error_message := 'Delegate number does not exist. Enter an existing delegate number.';
      ELSE
          out_error_message := SQLERRM;
      end if;
    END;
END;
/



--creating a new invoice
CREATE OR REPLACE PROCEDURE NEW_INVOICE (
  in_dateRaised IN Invoice.dateRaised%type,
  in_datePaid IN Invoice.datePaid%type,
  in_creditCardNo IN Invoice.creditCardNo%type,
  in_holdersName IN Invoice.holdersName%type,
  in_expiryDate IN Invoice.expiryDate%type,
  in_registrationNo IN Invoice.registrationNo%type,
  in_pMethodNo IN Invoice.pMethodNo%type,
  out_newInvoiceNo OUT Invoice.InvoiceNo%type,
  out_error_message OUT VARCHAR2
) is
BEGIN
  -- Initialize the error message to NULL
  out_error_message := NULL;

  -- Validate input
  IF in_dateRaised IS NULL OR
     in_datePaid IS NULL OR
     in_registrationNo IS NULL OR
     in_pMethodNo IS NULL THEN
     
    out_error_message := 'Missing required field(s)';
    RETURN;

  ELSIF in_datePaid < in_dateRaised THEN
    out_error_message := 'Date paid cannot be earlier than date raised';
    RETURN;
  
  ELSIF in_expiryDate < SYSDATE THEN
    out_error_message := 'Credit card expiry date cannot be in the past';
    RETURN;

  END IF;

  BEGIN
    -- Insert new invoice
    INSERT INTO Invoice (
      dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo
    ) VALUES (
      in_dateRaised, in_datePaid, in_creditCardNo, in_holdersName, in_expiryDate, in_registrationNo, in_pMethodNo
    ) RETURNING invoiceNo INTO out_newInvoiceNo;
    COMMIT; -- Commit the transaction to make the insertion permanent

  EXCEPTION
    WHEN OTHERS THEN
      IF SQLCODE = -2291 THEN
          out_error_message := 'Registration number does not exist. Enter an already existing registration number.';
      ELSE
        out_error_message := SQLERRM;
      end if;
  END;

END;
/

-- REMEMBER -- might replace with this

CREATE OR REPLACE PROCEDURE NEW_INVOICE (
  in_dateRaised IN Invoice.dateRaised%type,
  in_datePaid IN Invoice.datePaid%type,
  in_creditCardNo IN Invoice.creditCardNo%type,
  in_holdersName IN Invoice.holdersName%type,
  in_expiryDate IN Invoice.expiryDate%type,
  in_registrationNo IN Invoice.registrationNo%type,
  in_pMethodNo IN Invoice.pMethodNo%type,
  out_newInvoiceNo OUT Invoice.invoiceNo%type,
  out_newAmountPaid OUT Invoice.amountPaid%type,
  out_error_message OUT VARCHAR2
) IS
  v_delegateNo Registration.delegateNo%type;
  v_clientNo Delegate.clientNo%type;
  v_courseNo Registration.courseNo%type;
  v_delegateCount NUMBER;
  v_fee NUMBER;
BEGIN
  -- Initialize the error message to NULL
  out_error_message := NULL;

  -- Validate input
  IF in_dateRaised IS NULL OR
     in_datePaid IS NULL OR
     in_registrationNo IS NULL OR
     in_pMethodNo IS NULL THEN
     
    out_error_message := 'Missing required field(s)';
    RETURN;

  ELSIF in_datePaid < in_dateRaised THEN
    out_error_message := 'Date paid cannot be earlier than date raised';
    RETURN;
  
  ELSIF in_expiryDate < SYSDATE THEN
    out_error_message := 'Credit card expiry date cannot be in the past';
    RETURN;

  END IF;

  BEGIN
    -- Get the delegate number, client number, and course number from the registration
    SELECT delegateNo, courseNo
    INTO v_delegateNo, v_courseNo
    FROM Registration
    WHERE registrationNo = in_registrationNo;

    BEGIN
      -- Get the client number
      SELECT clientNo
      INTO v_clientNo
      FROM Delegate
      WHERE delegateNo = v_delegateNo;

      -- Count the number of delegates from the same client for the same course
      SELECT COUNT(*)
      INTO v_delegateCount
      FROM Registration r
      JOIN Delegate d ON r.delegateNo = d.delegateNo
      WHERE d.clientNo = v_clientNo AND r.courseNo = v_courseNo;

      -- Determine the fee based on the number of delegates
      SELECT fee
      INTO v_fee
      FROM DelegateFee df
      JOIN CourseFee cf ON df.delegateFeeNo = cf.delegateFeeNo
      WHERE cf.courseNo = v_courseNo
      AND v_delegateCount BETWEEN df.minDelegates AND NVL(df.maxDelegates, v_delegateCount);

    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        -- If no client or no matching fee structure, use the original course fee
        SELECT fee
        INTO v_fee
        FROM CourseFee
        WHERE courseNo = v_courseNo
        AND ROWNUM = 1;
    END;

    -- Insert new invoice with the determined fee
    INSERT INTO Invoice (
      dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo
    ) VALUES (
      in_dateRaised, in_datePaid, in_creditCardNo, in_holdersName, in_expiryDate, in_registrationNo, in_pMethodNo
    ) RETURNING invoiceNo INTO out_newInvoiceNo, amountPaid into out_newAmountPaid;
    
    COMMIT; -- Commit the transaction to make the insertion permanent

  EXCEPTION
    WHEN OTHERS THEN
     IF SQLCODE = -2291 THEN
          out_error_message := 'Registration number does not exist. Enter an already existing registration number.';
      ELSE
        out_error_message := SQLERRM;
      end if;
  END;

END;
/




--booking a location for a registration
CREATE OR REPLACE PROCEDURE new_booking(
    in_bookingDate IN Booking.bookingDate%type,
    in_locationNo IN Booking.locationNo%type,
    in_courseNo IN Booking.courseNo%type,
    in_bookingEmployeeNo IN Booking.bookingEmployeeNo%type,
    out_newBookingNo OUT Booking.bookingNo%type,
    out_error_message OUT VARCHAR2
) IS
  v_delivererEmployeeNo Course.delivererEmployeeNo%TYPE;
  v_maxDelegates Course.maxDelegates%TYPE;
  v_locationMaxSize Location.locationMaxSize%TYPE;
  v_location_exists Location.locationNo%type;
  v_course_exists Course.courseNo%type;
  v_employee_exists Employee.employeeNo%type;
  v_booking_exists Booking.bookingNo%type;

BEGIN
  -- Initialize the error message to NULL
  out_error_message := NULL;

  -- Validate input
  IF in_bookingDate IS NULL OR
     in_locationNo IS NULL OR
     in_courseNo IS NULL OR
     in_bookingEmployeeNo IS NULL THEN

    out_error_message := 'Missing required field(s)';
    RETURN;
  END IF;


  -- Check if the location number exists
    BEGIN
        SELECT COUNT(*)
        INTO v_location_exists
        FROM Location
        WHERE locationNo = in_locationNo;

        IF v_location_exists = 0 THEN
            out_error_message := 'Location number does not exist. Enter an existing location number.';
            RETURN;
        END IF;
      end;

       -- Check if the course number exists
    BEGIN
        SELECT count(*)
        INTO v_course_exists
        FROM Course
        WHERE courseNo = in_courseNo;

        IF v_course_exists = 0 THEN
            out_error_message := 'Course number does not exist. Enter an existing course number.';
            RETURN;
        END IF;
      end;

       -- Check if the employee number exists

      BEGIN
        SELECT COUNT(*)
        INTO v_employee_exists
        FROM Employee
        WHERE employeeNo = in_bookingEmployeeNo;

        IF v_employee_exists = 0 THEN
            out_error_message := 'Employee number does not exist. Enter an existing employee number.';
            RETURN;
        END IF;
      end;

-- Check if the booking employee is the course deliverer
    BEGIN
        SELECT delivererEmployeeNo
        INTO v_delivererEmployeeNo
        FROM Course
        WHERE courseNo = in_courseNo;

        IF v_delivererEmployeeNo != in_bookingEmployeeNo THEN
            out_error_message := 'Booking employee is not the course deliverer';
            RETURN;
        END IF;
      end;

    -- Check if the number of delegates does not exceed the location's maximum size
    BEGIN
        SELECT maxDelegates
        INTO v_maxDelegates
        FROM Course
        WHERE courseNo = in_courseNo;

        SELECT locationMaxSize
        INTO v_locationMaxSize
        FROM Location
        WHERE locationNo = in_locationNo;

        IF v_maxDelegates > v_locationMaxSize THEN
            out_error_message := 'Number of delegates exceeds location capacity';
            RETURN;
        END IF;
    end;

      -- Check if the location is already booked for the specified date
  BEGIN
    SELECT COUNT(*)
    INTO v_booking_exists
    FROM Booking
    WHERE bookingDate = in_bookingDate
      AND locationNo = in_locationNo;

    IF v_booking_exists > 0 THEN
        out_error_message := 'Location is already booked for the specified date';
        RETURN;
    else 
            BEGIN
            SELECT COUNT(*)
            INTO v_booking_exists
            FROM Booking
            WHERE bookingDate = in_bookingDate
              AND courseNo = in_courseNo;

            IF v_booking_exists > 0 THEN
                out_error_message := 'Course is already booked for a location on the specified date';
                RETURN;
            END IF;
            END;
    END IF;
  END;

  begin
  -- insert new booking
    INSERT INTO Booking(
        bookingDate,
        locationNo,
        courseNo,
        bookingEmployeeNo
    ) VALUES (
        in_bookingDate,
        in_locationNo,
        in_courseNo,
        in_bookingEmployeeNo
    )
    RETURNING bookingNo INTO out_newBookingNo;
    COMMIT; -- Commit the transaction to make the insertion permanent
  EXCEPTION
    WHEN OTHERS THEN
      out_error_message := SQLERRM;
  END;
END;
/







-- RETRIVE RECORDS with CURSORS

-- RETRIEVING EMPLOYEE DETAILS
CREATE OR REPLACE PROCEDURE get_employee_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM employee order by employeeNo;
END;
/

--RETRIEVING CLIENT DETAILS
CREATE OR REPLACE PROCEDURE get_client_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM client order by clientNo;
END;
/

--RETRIEVING DELEGATE DETAILS
CREATE OR REPLACE PROCEDURE get_delegate_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM delegate order by delegateNo;
END;
/

--RETRIEVING COURSE TYPE DETAILS
CREATE OR REPLACE PROCEDURE get_coursetype_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursetype order by courseTypeNo;
END;
/

--RETRIEVING COURSE DETAILS
CREATE OR REPLACE PROCEDURE get_course_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM course order by courseNo;
END;
/

--RETRIEVING COURSE FEE DETAILS
CREATE OR REPLACE PROCEDURE get_coursefee_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursefee order by courseFeeNo;
END;
/

--RETRIEVING PAYMENT METHOD DETAILS
CREATE OR REPLACE PROCEDURE get_paymentmethod_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM paymentmethod order by pMethodNo;
END;
/

--RETRIEVING LOCATION DETAILS
CREATE OR REPLACE PROCEDURE get_location_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM location order by locationNo;
END;
/

--RETRIEVING REGISTRATION DETAILS
CREATE OR REPLACE PROCEDURE get_registration_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM registration order by registrationNo;
END;
/

--RETRIEVING INVOICE DETAILS
CREATE OR REPLACE PROCEDURE get_invoice_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM invoice order by invoiceNo;
END;
/

--RETRIEVING BOOKING DETAILS
CREATE OR REPLACE PROCEDURE get_booking_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM booking order by bookingNo;
END;
/




--deleting records

CREATE OR REPLACE PROCEDURE delete_employee(p_employeeNo IN Employee.employeeNo%type) AS
BEGIN
  DELETE FROM Employee WHERE employeeNo = p_employeeNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete employee due to related records.');
END;
/


-- delete from clients
CREATE OR REPLACE PROCEDURE delete_client(p_clientNo IN client.clientNo%type) AS
BEGIN
  DELETE FROM client WHERE clientNo = p_clientNo;
  COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete client due to related records.');
END;
/

-- delete from delegate
CREATE OR REPLACE PROCEDURE delete_delegate(p_delegateNo IN delegate.delegateNo%type) AS
BEGIN
  DELETE FROM delegate WHERE delegateNo = p_delegateNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete delegate due to related records.');
END;
/

-- delete from course type
CREATE OR REPLACE PROCEDURE delete_courseType(p_courseTypeNo IN coursetype.courseTypeNo%type) AS
BEGIN
  DELETE FROM coursetype WHERE courseTypeNo = p_courseTypeNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete course type due to related records.');
END;
/

-- delete from course
CREATE OR REPLACE PROCEDURE delete_course(p_courseNo IN course.courseNo%type) AS
BEGIN
  DELETE FROM course WHERE courseNo = p_courseNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete course due to related records.');
END;
/

-- delete from course fee
CREATE OR REPLACE PROCEDURE delete_courseFee(p_courseFeeNo IN coursefee.courseFeeNo%type) AS
BEGIN
  DELETE FROM coursefee WHERE courseFeeNo = p_courseFeeNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete course fee due to related records.');
END;
/

-- delete from payment method
CREATE OR REPLACE PROCEDURE delete_paymentMethod(p_paymentMethodNo IN paymentmethod.pMethodNo%type) AS
BEGIN
  DELETE FROM paymentmethod WHERE pMethodNo = p_paymentMethodNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete payment method due to related records.');
END;
/

-- delete from location 
CREATE OR REPLACE PROCEDURE delete_location(p_locationNo IN location.locationNo%type) AS
BEGIN
  DELETE FROM location WHERE locationNo = p_locationNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete location due to related records.');
END;
/

-- delete from registration 
CREATE OR REPLACE PROCEDURE delete_registration(p_registrationNo IN registration.registrationNo%type) AS
BEGIN
  DELETE FROM registration WHERE registrationNo = p_registrationNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete registration due to related records.');
END;
/

-- delete from invoice 
CREATE OR REPLACE PROCEDURE delete_invoice(p_invoiceNo IN invoice.invoiceNo%type) AS
BEGIN
  DELETE FROM invoice WHERE invoiceNo = p_invoiceNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete invoice due to related records.');
END;
/

-- delete from booking
CREATE OR REPLACE PROCEDURE delete_booking(p_bookingNo IN booking.bookingNo%type) AS
BEGIN
  DELETE FROM booking WHERE bookingNo = p_bookingNo;
    COMMIT;
exception
  when others then
    RAISE_APPLICATION_ERROR(-20001, 'Cannot delete booking due to related records.');
END;
/


-- updating records
CREATE OR REPLACE PROCEDURE update_employee(
    in_employeeNo IN employee.employeeNo%type,
    in_employeeFName IN employee.employeeFName%type,
    in_employeeLName IN employee.employeeLName%type,
    in_employeeEmail IN employee.employeeEmail%type,
    in_employeeContact IN employee.employeeContact%type
) IS
BEGIN
    UPDATE employee
    SET 
        employeeFName = in_employeeFName,
        employeeLName = in_employeeLName,
        employeeEmail = in_employeeEmail,
        employeeContact = in_employeeContact
    WHERE 
        employeeNo = in_employeeNo;
END;
/



--CREATING USER LOGS

-- LOG EMPLOYEE TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_employee_activity
AFTER INSERT OR UPDATE OR DELETE ON employee
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: employeeNo=' || :NEW.employeeNo || 
                        ', employeeFName=' || :NEW.employeeFName || 
                        ', employeeLName=' || :NEW.employeeLName || 
                        ', employeeEmail=' || :NEW.employeeEmail || 
                        ', employeeContact=' || :NEW.employeeContact;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: employeeNo=' || :OLD.employeeNo || 
                        ', employeeFName=' || :OLD.employeeFName || 
                        ', employeeLName=' || :OLD.employeeLName || 
                        ', employeeEmail=' || :OLD.employeeEmail || 
                        ', employeeContact=' || :OLD.employeeContact;
        v_new_values := 'New Values: employeeNo=' || :NEW.employeeNo || 
                        ', employeeFName=' || :NEW.employeeFName || 
                        ', employeeLName=' || :NEW.employeeLName || 
                        ', employeeEmail=' || :NEW.employeeEmail || 
                        ', employeeContact=' || :NEW.employeeContact;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: employeeNo=' || :OLD.employeeNo || 
                        ', employeeFName=' || :OLD.employeeFName || 
                        ', employeeLName=' || :OLD.employeeLName || 
                        ', employeeEmail=' || :OLD.employeeEmail || 
                        ', employeeContact=' || :OLD.employeeContact;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'employees', v_old_values, v_new_values);
END;
/


-- LOG CLIENT TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_client_activity
AFTER INSERT OR UPDATE OR DELETE ON Client
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: clientNo=' || :NEW.clientNo || 
                        ', clientName=' || :NEW.clientName || 
                        ', clientEmail=' || :NEW.clientEmail || 
                        ', clientContact=' || :NEW.clientContact;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: clientNo=' || :OLD.clientNo || 
                        ', clientName=' || :OLD.clientName || 
                        ', clientEmail=' || :OLD.clientEmail || 
                        ', clientContact=' || :OLD.clientContact;
        v_new_values := 'New Values: clientNo=' || :NEW.clientNo || 
                        ', clientName=' || :NEW.clientName || 
                        ', clientEmail=' || :NEW.clientEmail || 
                        ', clientContact=' || :NEW.clientContact;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: clientNo=' || :OLD.clientNo || 
                        ', clientName=' || :OLD.clientName || 
                        ', clientEmail=' || :OLD.clientEmail || 
                        ', clientContact=' || :OLD.clientContact;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Client', v_old_values, v_new_values);
END;
/


--LOG DELEGATE TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_delegate_activity
AFTER INSERT OR UPDATE OR DELETE ON Delegate
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: delegateNo=' || :NEW.delegateNo || 
                        ', delegateTitle=' || :NEW.delegateTitle || 
                        ', delegateFName=' || :NEW.delegateFName || 
                        ', delegateLName=' || :NEW.delegateLName || 
                        ', delegateStret=' || :NEW.delegateStreet || 
                        ', City=' || :NEW.delegateCity || 
                        ', State=' || :NEW.delegateState || 
                        ', Zip Code=' || :NEW.delegateZipCode || 
                        ', Tel Number=' || :NEW.attTelNo || 
                        ', Fax Number=' || :NEW.attFaxNo || 
                        ', Email=' || :NEW.attEmailAddress || 
                        ', clientNo=' || :NEW.clientNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: delegateNo=' || :OLD.delegateNo || 
                         ', delegateTitle=' || :OLD.delegateTitle || 
                        ', delegateFName=' || :OLD.delegateFName || 
                        ', delegateLName=' || :OLD.delegateLName || 
                        ', delegateStret=' || :OLD.delegateStreet || 
                        ', delegateCity=' || :OLD.delegateCity || 
                        ', delegateState=' || :OLD.delegateState || 
                        ', delegateZipCode=' || :OLD.delegateZipCode || 
                        ', Tel Number=' || :OLD.attTelNo || 
                        ', Fax Number=' || :OLD.attFaxNo || 
                        ', Email=' || :OLD.attEmailAddress ||
                        ', clientNo=' || :OLD.clientNo;
        v_new_values := 'New Values: delegateNo=' || :NEW.delegateNo || 
                        ', delegateTitle=' || :NEW.delegateTitle || 
                        ', delegateFName=' || :NEW.delegateFName || 
                        ', delegateLName=' || :NEW.delegateLName || 
                        ', delegateStret=' || :NEW.delegateStreet || 
                        ', City=' || :NEW.delegateCity || 
                        ', State=' || :NEW.delegateState || 
                        ', Zip Code=' || :NEW.delegateZipCode || 
                        ', Tel Number=' || :NEW.attTelNo || 
                        ', Fax Number=' || :NEW.attFaxNo || 
                        ', Email=' || :NEW.attEmailAddress ||
                        ', clientNo=' || :NEW.clientNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: delegateNo=' || :OLD.delegateNo || 
                         ', delegateTitle=' || :OLD.delegateTitle || 
                        ', delegateFName=' || :OLD.delegateFName || 
                        ', delegateLName=' || :OLD.delegateLName || 
                        ', delegateStret=' || :OLD.delegateStreet || 
                        ', delegateCity=' || :OLD.delegateCity || 
                        ', delegateState=' || :OLD.delegateState || 
                        ', delegateZipCode=' || :OLD.delegateZipCode || 
                        ', Tel Number=' || :OLD.attTelNo || 
                        ', Fax Number=' || :OLD.attFaxNo || 
                        ', Email=' || :OLD.attEmailAddress ||
                        ', clientNo=' || :OLD.clientNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Delegate', v_old_values, v_new_values);
END;
/

-- LOG COURSE TYPE TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_coursetype_activity
AFTER INSERT OR UPDATE OR DELETE ON CourseType
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: courseTypeNo=' || :NEW.courseTypeNo || 
                        ', courseTypeDescription=' || :NEW.courseTypeDescription;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: courseTypeNo=' || :OLD.courseTypeNo || 
                        ', courseTypeDescription=' || :OLD.courseTypeDescription;
        v_new_values := 'New Values: courseTypeNo=' || :NEW.courseTypeNo || 
                        ', courseTypeDescription=' || :NEW.courseTypeDescription;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: courseTypeNo=' || :OLD.courseTypeNo || 
                        ', courseTypeDescription=' || :OLD.courseTypeDescription;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'CourseType', v_old_values, v_new_values);
END;
/

--lOG COURSE TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_course_activity
AFTER INSERT OR UPDATE OR DELETE ON Course
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: courseNo=' || :NEW.courseNo || 
                        ', courseName=' || :NEW.courseName || 
                        ', courseDescription=' || :NEW.courseDescription || 
                        ', startDate=' || TO_CHAR(:NEW.startDate, 'YYYY-MM-DD') || 
                        ', startTime=' || TO_CHAR(:NEW.startTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', endDate=' || TO_CHAR(:NEW.endDate, 'YYYY-MM-DD') || 
                        ', endTime=' || TO_CHAR(:NEW.endTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', maxDelegates=' || :NEW.maxDelegates || 
                        ', confirmed=' || :NEW.confirmed || 
                        ', delivererEmployeeNo=' || :NEW.delivererEmployeeNo || 
                        ', courseTypeNo=' || :NEW.courseTypeNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: courseNo=' || :OLD.courseNo || 
                        ', courseName=' || :OLD.courseName || 
                        ', courseDescription=' || :OLD.courseDescription || 
                        ', startDate=' || TO_CHAR(:OLD.startDate, 'YYYY-MM-DD') || 
                        ', startTime=' || TO_CHAR(:OLD.startTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', endDate=' || TO_CHAR(:OLD.endDate, 'YYYY-MM-DD') || 
                        ', endTime=' || TO_CHAR(:OLD.endTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', maxDelegates=' || :OLD.maxDelegates || 
                        ', confirmed=' || :OLD.confirmed || 
                        ', delivererEmployeeNo=' || :OLD.delivererEmployeeNo || 
                        ', courseTypeNo=' || :OLD.courseTypeNo;
        v_new_values := 'New Values: courseNo=' || :NEW.courseNo || 
                        ', courseName=' || :NEW.courseName || 
                        ', courseDescription=' || :NEW.courseDescription || 
                        ', startDate=' || TO_CHAR(:NEW.startDate, 'YYYY-MM-DD') || 
                        ', startTime=' || TO_CHAR(:NEW.startTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', endDate=' || TO_CHAR(:NEW.endDate, 'YYYY-MM-DD') || 
                        ', endTime=' || TO_CHAR(:NEW.endTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', maxDelegates=' || :NEW.maxDelegates || 
                        ', confirmed=' || :NEW.confirmed || 
                        ', delivererEmployeeNo=' || :NEW.delivererEmployeeNo || 
                        ', courseTypeNo=' || :NEW.courseTypeNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: courseNo=' || :OLD.courseNo || 
                        ', courseName=' || :OLD.courseName || 
                        ', courseDescription=' || :OLD.courseDescription || 
                        ', startDate=' || TO_CHAR(:OLD.startDate, 'YYYY-MM-DD') || 
                        ', startTime=' || TO_CHAR(:OLD.startTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', endDate=' || TO_CHAR(:OLD.endDate, 'YYYY-MM-DD') || 
                        ', endTime=' || TO_CHAR(:OLD.endTime, 'YYYY-MM-DD HH24:MI:SS') || 
                        ', maxDelegates=' || :OLD.maxDelegates || 
                        ', confirmed=' || :OLD.confirmed || 
                        ', delivererEmployeeNo=' || :OLD.delivererEmployeeNo || 
                        ', courseTypeNo=' || :OLD.courseTypeNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Course', v_old_values, v_new_values);
END;
/

--LOG COURSE FEE TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_coursefee_activity
AFTER INSERT OR UPDATE OR DELETE ON CourseFee
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: courseFeeNo=' || :NEW.courseFeeNo || 
                        ', feeDescription=' || :NEW.feeDescription || 
                        ', fee=' || :NEW.fee || 
                        ', courseNo=' || :NEW.courseNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: courseFeeNo=' || :OLD.courseFeeNo || 
                        ', feeDescription=' || :OLD.feeDescription || 
                        ', fee=' || :OLD.fee || 
                        ', courseNo=' || :OLD.courseNo;
        v_new_values := 'New Values: courseFeeNo=' || :NEW.courseFeeNo || 
                        ', feeDescription=' || :NEW.feeDescription || 
                        ', fee=' || :NEW.fee || 
                        ', courseNo=' || :NEW.courseNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: courseFeeNo=' || :OLD.courseFeeNo || 
                        ', feeDescription=' || :OLD.feeDescription || 
                        ', fee=' || :OLD.fee || 
                        ', courseNo=' || :OLD.courseNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'CourseFee', v_old_values, v_new_values);
END;
/


-- LOG PAYMENT METHOD TABLE AVCTIVITIES
CREATE OR REPLACE TRIGGER log_paymentmethod_activity
AFTER INSERT OR UPDATE OR DELETE ON PaymentMethod
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: pMethodNo=' || :NEW.pMethodNo || 
                        ', pMethodName=' || :NEW.pMethodName;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: pMethodNo=' || :OLD.pMethodNo || 
                        ', pMethodName=' || :OLD.pMethodName;
        v_new_values := 'New Values: pMethodNo=' || :NEW.pMethodNo || 
                        ', pMethodName=' || :NEW.pMethodName;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: pMethodNo=' || :OLD.pMethodNo || 
                        ', pMethodName=' || :OLD.pMethodName;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'PaymentMethod', v_old_values, v_new_values);
END;
/

-- LOG LOCATION TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_location_activity
AFTER INSERT OR UPDATE OR DELETE ON Location
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: locationNo=' || :NEW.locationNo || 
                        ', locationName=' || :NEW.locationName || 
                        ', locationMaxSize=' || :NEW.locationMaxSize;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: locationNo=' || :OLD.locationNo || 
                        ', locationName=' || :OLD.locationName || 
                        ', locationMaxSize=' || :OLD.locationMaxSize;
        v_new_values := 'New Values: locationNo=' || :NEW.locationNo || 
                        ', locationName=' || :NEW.locationName || 
                        ', locationMaxSize=' || :NEW.locationMaxSize;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: locationNo=' || :OLD.locationNo || 
                        ', locationName=' || :OLD.locationName || 
                        ', locationMaxSize=' || :OLD.locationMaxSize;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Location', v_old_values, v_new_values);
END;
/

-- LOG REGISTRATION TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_registration_activity
AFTER INSERT OR UPDATE OR DELETE ON Registration
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: registrationNo=' || :NEW.registrationNo || 
                        ', registrationDate=' || TO_CHAR(:NEW.registrationDate, 'YYYY-MM-DD') || 
                        ', delegateNo=' || :NEW.delegateNo || 
                        ', courseFeeNo=' || :NEW.courseFeeNo || 
                        ', registerEmployeeNo=' || :NEW.registerEmployeeNo || 
                        ', courseNo=' || :NEW.courseNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: registrationNo=' || :OLD.registrationNo || 
                        ', registrationDate=' || TO_CHAR(:OLD.registrationDate, 'YYYY-MM-DD') || 
                        ', delegateNo=' || :OLD.delegateNo || 
                        ', courseFeeNo=' || :OLD.courseFeeNo || 
                        ', registerEmployeeNo=' || :OLD.registerEmployeeNo || 
                        ', courseNo=' || :OLD.courseNo;
        v_new_values := 'New Values: registrationNo=' || :NEW.registrationNo || 
                        ', registrationDate=' || TO_CHAR(:NEW.registrationDate, 'YYYY-MM-DD') || 
                        ', delegateNo=' || :NEW.delegateNo || 
                        ', courseFeeNo=' || :NEW.courseFeeNo || 
                        ', registerEmployeeNo=' || :NEW.registerEmployeeNo || 
                        ', courseNo=' || :NEW.courseNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: registrationNo=' || :OLD.registrationNo || 
                        ', registrationDate=' || TO_CHAR(:OLD.registrationDate, 'YYYY-MM-DD') || 
                        ', delegateNo=' || :OLD.delegateNo || 
                        ', courseFeeNo=' || :OLD.courseFeeNo || 
                        ', registerEmployeeNo=' || :OLD.registerEmployeeNo || 
                        ', courseNo=' || :OLD.courseNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Registration', v_old_values, v_new_values);
END;
/


-- LOG INVOICE TABLE ACTIVITIES 
CREATE OR REPLACE TRIGGER log_invoice_activity
AFTER INSERT OR UPDATE OR DELETE ON Invoice
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: invoiceNo=' || :NEW.invoiceNo || 
                        ', dateRaised=' || TO_CHAR(:NEW.dateRaised, 'YYYY-MM-DD') || 
                        ', datePaid=' || TO_CHAR(:NEW.datePaid, 'YYYY-MM-DD') || 
                        ', creditCardNo=' || :NEW.creditCardNo || 
                        ', holdersName=' || :NEW.holdersName || 
                        ', expiryDate=' || TO_CHAR(:NEW.expiryDate, 'YYYY-MM-DD') || 
                        ', registrationNo=' || :NEW.registrationNo || 
                        ', pMethodNo=' || :NEW.pMethodNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: invoiceNo=' || :OLD.invoiceNo || 
                        ', dateRaised=' || TO_CHAR(:OLD.dateRaised, 'YYYY-MM-DD') || 
                        ', datePaid=' || TO_CHAR(:OLD.datePaid, 'YYYY-MM-DD') || 
                        ', creditCardNo=' || :OLD.creditCardNo || 
                        ', holdersName=' || :OLD.holdersName || 
                        ', expiryDate=' || TO_CHAR(:OLD.expiryDate, 'YYYY-MM-DD') || 
                        ', registrationNo=' || :OLD.registrationNo || 
                        ', pMethodNo=' || :OLD.pMethodNo;
        v_new_values := 'New Values: invoiceNo=' || :NEW.invoiceNo || 
                        ', dateRaised=' || TO_CHAR(:NEW.dateRaised, 'YYYY-MM-DD') || 
                        ', datePaid=' || TO_CHAR(:NEW.datePaid, 'YYYY-MM-DD') || 
                        ', creditCardNo=' || :NEW.creditCardNo || 
                        ', holdersName=' || :NEW.holdersName || 
                        ', expiryDate=' || TO_CHAR(:NEW.expiryDate, 'YYYY-MM-DD') || 
                        ', registrationNo=' || :NEW.registrationNo || 
                        ', pMethodNo=' || :NEW.pMethodNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: invoiceNo=' || :OLD.invoiceNo || 
                        ', dateRaised=' || TO_CHAR(:OLD.dateRaised, 'YYYY-MM-DD') || 
                        ', datePaid=' || TO_CHAR(:OLD.datePaid, 'YYYY-MM-DD') || 
                        ', creditCardNo=' || :OLD.creditCardNo || 
                        ', holdersName=' || :OLD.holdersName || 
                        ', expiryDate=' || TO_CHAR(:OLD.expiryDate, 'YYYY-MM-DD') || 
                        ', registrationNo=' || :OLD.registrationNo || 
                        ', pMethodNo=' || :OLD.pMethodNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Invoice', v_old_values, v_new_values);
END;
/

-- LOG BOOKING TABLE ACTIVITIES
CREATE OR REPLACE TRIGGER log_booking_activity
AFTER INSERT OR UPDATE OR DELETE ON Booking
FOR EACH ROW
DECLARE
    v_action VARCHAR2(50);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    -- Determine the action type
    IF INSERTING THEN
        v_action := 'INSERT';
        v_new_values := 'New Values: bookingNo=' || :NEW.bookingNo || 
                        ', bookingDate=' || TO_CHAR(:NEW.bookingDate, 'YYYY-MM-DD') || 
                        ', locationNo=' || :NEW.locationNo || 
                        ', courseNo=' || :NEW.courseNo || 
                        ', bookingEmployeeNo=' || :NEW.bookingEmployeeNo;
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
        v_old_values := 'Old Values: bookingNo=' || :OLD.bookingNo || 
                        ', bookingDate=' || TO_CHAR(:OLD.bookingDate, 'YYYY-MM-DD') || 
                        ', locationNo=' || :OLD.locationNo || 
                        ', courseNo=' || :OLD.courseNo || 
                        ', bookingEmployeeNo=' || :OLD.bookingEmployeeNo;
        v_new_values := 'New Values: bookingNo=' || :NEW.bookingNo || 
                        ', bookingDate=' || TO_CHAR(:NEW.bookingDate, 'YYYY-MM-DD') || 
                        ', locationNo=' || :NEW.locationNo || 
                        ', courseNo=' || :NEW.courseNo || 
                        ', bookingEmployeeNo=' || :NEW.bookingEmployeeNo;
    ELSIF DELETING THEN
        v_action := 'DELETE';
        v_old_values := 'Old Values: bookingNo=' || :OLD.bookingNo || 
                        ', bookingDate=' || TO_CHAR(:OLD.bookingDate, 'YYYY-MM-DD') || 
                        ', locationNo=' || :OLD.locationNo || 
                        ', courseNo=' || :OLD.courseNo || 
                        ', bookingEmployeeNo=' || :OLD.bookingEmployeeNo;
    END IF;

    -- Insert the log into ActivityLog table
    INSERT INTO ActivityLog (username, actionType, tableName, oldValues, newValues)
    VALUES (USER, v_action, 'Booking', v_old_values, v_new_values);
END;
/

-- BACKING UP
-- CREATE OR REPLACE PROCEDURE backup_database_proc AS
--     backup_directory VARCHAR2(100) := 'skill-master-course-management\backups'; -- Update with your backup directory path
--     backup_filename VARCHAR2(100) := 'database_backup.dmp'; -- Adjust filename as needed
--     out_error_message VARCHAR2(100) := 'Error during backup: '
-- BEGIN
--     -- Ensure the directory exists
--     EXECUTE IMMEDIATE 'CREATE OR REPLACE DIRECTORY backup_dir AS ''' || backup_directory || '''';

--     -- Perform the export using Data Pump
--     DBMS_DATAPUMP.OPEN('EXPORT', 'FULL', NULL, NULL, 'backup_job', 'backup_dir');
--     DBMS_DATAPUMP.ADD_FILE('DUMPFILE', backup_filename, 'backup_dir');
--     DBMS_DATAPUMP.ADD_FILE('LOGFILE', 'export.log', 'backup_dir');
--     DBMS_DATAPUMP.START_JOB('backup_job');
    
--     -- Optional: Commit the transaction
--     COMMIT;
-- EXCEPTION
--     WHEN OTHERS THEN
--         -- Handle exceptions (replace with appropriate error handling)
--         RAISE_APPLICATION_ERROR(-20001, out_error_message || SQLERRM);
--         ROLLBACK; -- Rollback the transaction if an error occurs
-- END;
-- /


-- CREATE OR REPLACE TRIGGER credit_card_details_check
-- BEFORE INSERT OR UPDATE ON Invoice
-- FOR EACH ROW
-- DECLARE
--     out_error_message VARCHAR2(200);
-- BEGIN
--     IF :NEW.creditCardNo IS NOT NULL THEN
--         -- Check if holdersName and expiryDate are provided if creditCardNo is filled
--         IF :NEW.holdersName IS NULL OR :NEW.expiryDate IS NULL THEN
--             out_error_message := 'If credit card details are provided, holdersName and expiryDate must also be filled.';
--             RAISE_APPLICATION_ERROR(-20001, out_error_message);
--         END IF;

--     ELSIF :NEW.holdersName IS NOT NULL THEN
--         -- Check if creditcardNo and expiryDate are provided if holdersname is filled
--         IF :NEW.creditCardNo IS NULL OR :NEW.expiryDate IS NULL THEN
--             out_error_message := 'If credit card details are provided, credit card number and expiryDate must also be filled.';
--             RAISE_APPLICATION_ERROR(-20001, out_error_message);
--         END IF;  

--      ELSIF :NEW.expiryDate IS NOT NULL THEN
--         -- Check if holdersName and creditcardNo are provided if expirey date is filled
--         IF :NEW.holdersName IS NULL OR :NEW.expiryDate IS NULL THEN
--             out_error_message := 'If credit card details are provided, holdersName and credi card number must also be filled.';
--             RAISE_APPLICATION_ERROR(-20001, out_error_message);
--         END IF;  

--     END IF;
--   end;
--   /
