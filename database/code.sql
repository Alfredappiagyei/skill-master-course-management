-- this file cotains the 
-- TRIGGERS and PROCEDURES and CURSORS for INSERTING AND RETRIEVING INFORMATION
-- from the database

-- INSERTING RECORDS WITH STORED PROCEDURES
--create a new employee

CREATE OR REPLACE PROCEDURE new_employee(
    in_employeeFName in employee.employeeFName%type,
    in_employeeLName in employee.employeeLName%type,
    in_employeeEmail in employee.employeeEmail%type,
    in_employeeContact in employee.employeeContact%type,
    out_newEmployeeNo OUT employee.employeeNo%type
) IS
BEGIN
    INSERT INTO employee(employeeFName, employeeLName, employeeEmail, employeeContact)
    VALUES(in_employeeFName, in_employeeLName, in_employeeEmail, in_employeeContact)
    RETURNING employeeNo INTO out_newEmployeeNo;
END;
/


--create a new client
CREATE OR REPLACE PROCEDURE new_client(
    in_clientName IN client.clientName%type,
    in_clientEmail IN client.clientEmail%type,
    in_clientContact IN client.clientContact%type,
    out_newclientNo OUT client.clientNo%type
) IS
BEGIN
    INSERT INTO client(clientName, clientEmail, clientContact)
    VALUES (in_clientName, in_clientEmail, in_clientContact)
    RETURNING clientNo INTO out_newclientNo;
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
    out_newdelegateNo OUT delegate.delegateNo%type
) IS
BEGIN
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
        clientNo)
    VALUES(
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
END;
/

-- creating a new course type
CREATE OR REPLACE PROCEDURE new_course_type(
    in_courseTypeDescription IN CourseType.courseTypeDescription%type,
    out_newCourseTypeNo OUT CourseType.courseTypeNo%type
) IS
BEGIN
    INSERT INTO coursetype (
        courseTypeDescription
    ) VALUES (
        in_courseTypeDescription
    )
    RETURNING courseTypeNo INTO out_newCourseTypeNo;
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
    out_newCourseNo OUT Course.courseNo%TYPE
) IS
BEGIN
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
END;
/

-- creating a course fee
CREATE OR REPLACE PROCEDURE new_course_fee(
    in_feeDescription IN CourseFee.feeDescription%TYPE,
    in_fee IN CourseFee.fee%TYPE,
    in_courseNo IN CourseFee.courseNo%TYPE,
    out_newCourseFeeNo OUT CourseFee.courseFeeNo%TYPE
) IS
BEGIN
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
END;
/

-- creating a payment method
CREATE OR REPLACE PROCEDURE new_payment_method(
    in_pMethodName IN PaymentMethod.pMethodName%TYPE,
    out_newPMethodNo OUT PaymentMethod.pMethodNo%TYPE
) IS
BEGIN
    INSERT INTO PaymentMethod (
        pMethodName
    ) VALUES (
        in_pMethodName
    )
    RETURNING pMethodNo INTO out_newPMethodNo;
END;
/

--creating a new location
CREATE OR REPLACE PROCEDURE new_location(
    in_locationName IN Location.locationName%TYPE,
    in_locationMaxSize IN Location.locationMaxSize%TYPE,
    out_newLocationNo OUT Location.locationNo%TYPE
) IS
BEGIN
    INSERT INTO Location (
        locationName,
        locationMaxSize
    ) VALUES (
        in_locationName,
        in_locationMaxSize
    )
    RETURNING locationNo INTO out_newLocationNo;
END;
/

--creating new registration
CREATE OR REPLACE PROCEDURE NEW_REGISTRATION(
  in_registrationDate IN registration.registrationDate%type,
  in_delegateNo IN registration.delegateNo%type,
  in_courseFeeNo IN registration.courseFeeNo%type,
  in_registerEmployeeNo IN registration.registerEmployeeNo%type,
  in_courseNo IN registration.courseNo%type,
  out_newRegistrationNo OUT Registration.registrationNo%TYPE

) AS
BEGIN
  INSERT INTO Registration (registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo)
  VALUES (in_registrationDate, in_delegateNo, in_courseFeeNo, in_registerEmployeeNo, in_courseNo)
  RETURNING registrationNo INTO out_newRegistrationNo;
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
  out_newInvoiceNo OUT Invoice.InvoiceNo%type
) AS
BEGIN
  INSERT INTO Invoice (
    dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo
  ) VALUES (
    in_dateRaised, in_datePaid, in_creditCardNo, in_holdersName, in_expiryDate, in_registrationNo, in_pMethodNo
  ) RETURNING invoiceNo INTO out_newInvoiceNo;
END;
/


--book a location for a registration
CREATE OR REPLACE PROCEDURE new_booking(
    in_bookingDate IN Booking.bookingDate%type,
    in_locationNo IN Booking.locationNo%type,
    in_courseNo IN Booking.courseNo%type,
    in_bookingEmployeeNo IN Booking.bookingEmployeeNo%type,
    out_newBookingNo OUT Booking.bookingNo%type
) IS
BEGIN
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
END;
/






-- RETRIVE RECORDS with CURSORS

-- RETRIEVING EMPLOYEE DETAILS
CREATE OR REPLACE PROCEDURE get_employees_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM employee;
END;
/

--RETRIEVING CLIENT DETAILS
CREATE OR REPLACE PROCEDURE get_client_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM client;
END;
/

--RETRIEVING DELEGATE DETAILS
CREATE OR REPLACE PROCEDURE get_delegate_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM delegate;
END;
/

--RETRIEVING COURSE TYPE DETAILS
CREATE OR REPLACE PROCEDURE get_coursetype_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursetype;
END;
/

--RETRIEVING COURSE DETAILS
CREATE OR REPLACE PROCEDURE get_course_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM course;
END;
/

--RETRIEVING COURSE FEE DETAILS
CREATE OR REPLACE PROCEDURE get_coursefee_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursefee;
END;
/

--RETRIEVING PAYMENT METHOD DETAILS
CREATE OR REPLACE PROCEDURE get_paymentmethod_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM paymentmethod;
END;
/

--RETRIEVING LOCATION DETAILS
CREATE OR REPLACE PROCEDURE get_location_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM location;
END;
/

--RETRIEVING REGISTRATION DETAILS
CREATE OR REPLACE PROCEDURE get_registration_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM registration;
END;
/

--RETRIEVING INVOICE DETAILS
CREATE OR REPLACE PROCEDURE get_invoice_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM invoice;
END;
/

--RETRIEVING BOOKING DETAILS
CREATE OR REPLACE PROCEDURE get_booking_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM booking;
END;
/

--deleting records

CREATE OR REPLACE PROCEDURE delete_employee(p_employeeNo IN Employee.employeeNo%type) AS
BEGIN
  DELETE FROM Employee WHERE employeeNo = p_employeeNo;
END;
/


-- delete from clients
CREATE OR REPLACE PROCEDURE delete_client(p_clientNo IN client.clientNo%type) AS
BEGIN
  DELETE FROM client WHERE clientNo = p_clientNo;
END;
/

-- delete from delegate
CREATE OR REPLACE PROCEDURE delete_delegate(p_delegateNo IN delegate.delegateNo%type) AS
BEGIN
  DELETE FROM delegate WHERE delegateNo = p_delegateNo;
END;
/

-- delete from course type
CREATE OR REPLACE PROCEDURE delete_courseType(p_courseTypeNo IN coursetype.courseTypeNo%type) AS
BEGIN
  DELETE FROM coursetype WHERE courseTypeNo = p_courseTypeNo;
END;
/

-- delete from course
CREATE OR REPLACE PROCEDURE delete_course(p_courseNo IN course.courseNo%type) AS
BEGIN
  DELETE FROM course WHERE courseNo = p_courseNo;
END;
/

-- delete from course fee
CREATE OR REPLACE PROCEDURE delete_courseFee(p_courseFeeNo IN coursefee.courseFeeNo%type) AS
BEGIN
  DELETE FROM coursefee WHERE courseFeeNo = p_courseFeeNo;
END;
/

-- delete from payment method
CREATE OR REPLACE PROCEDURE delete_paymentMethod(p_paymentMethodNo IN paymentmethod.pMethodNo%type) AS
BEGIN
  DELETE FROM paymentmethod WHERE pMethodNo = p_paymentMethodNo;
END;
/

-- delete from location 
CREATE OR REPLACE PROCEDURE delete_location(p_locationNo IN location.locationNo%type) AS
BEGIN
  DELETE FROM location WHERE locationNo = p_locationNo;
END;
/

-- delete from registration 
CREATE OR REPLACE PROCEDURE delete_registration(p_registrationNo IN registration.registrationNo%type) AS
BEGIN
  DELETE FROM registration WHERE registrationNo = p_registrationNo;
END;
/

-- delete from invoice 
CREATE OR REPLACE PROCEDURE delete_invoice(p_invoiceNo IN invoice.invoiceNo%type) AS
BEGIN
  DELETE FROM invoice WHERE invoiceNo = p_invoiceNo;
END;
/

-- delete from booking
CREATE OR REPLACE PROCEDURE delete_booking(p_bookingNo IN booking.bookingNo%type) AS
BEGIN
  DELETE FROM booking WHERE bookingNo = p_bookingNo;
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
