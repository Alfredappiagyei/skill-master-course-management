-- this file cotains the 
-- TRIGGERS and PROCEDURES and CURSORS for INSERTING AND RETRIEVING INFORMATION
-- from the database


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


-- create an invoice for registration
create or replace procedure create_invoice(
    in_dateRaised in invoice.dateRaised%type,
    in_datePaid in invoice.datePaid%type,
    in_creditCardNo in invoice.creditCardNo%type,
    in_holdersName in invoice.holdersName%type,
    in_expiryDate in invoice.expiryDate%type,
    in_registrationNo in invoice.registrationNo%type,
    in_pMethodNo in invoice.pMethodNo%type
) is 
begin
    insert into invoice(
        dateRaised,
        datePaid,
        creditCardNo,
        holdersName,
        expiryDate,
        registrationNo,
        pMethodNo)
    values(
        in_dateRaised,
        in_datePaid,
        in_creditCardNo,
        in_holdersName,
        in_expiryDate,
        in_registrationNo,
        in_pMethodNo
    );
end;
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






-- RETRIVE RECORDS
-- front end with JS

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

-- delete from employees
CREATE OR REPLACE PROCEDURE delete_employee(p_employeeNo IN NUMBER) AS
BEGIN
  DELETE FROM Employee WHERE employeeNo = p_employeeNo;
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

