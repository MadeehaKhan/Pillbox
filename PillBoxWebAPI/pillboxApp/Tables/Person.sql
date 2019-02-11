CREATE TABLE [dbo].[Person]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [GivenName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [Age] INT NOT NULL, 
    [Email] NVARCHAR(255) NOT NULL, 
    [Password] VARBINARY(64) NOT NULL, 
    [Salt] UNIQUEIDENTIFIER NOT NULL, 
    [PhoneNumber] BIGINT NOT NULL, 
    [EmergencyContact1] NVARCHAR(255) NULL, 
	[EmergencyContact2] NVARCHAR(255) NULL, 
    [Height] FLOAT NOT NULL, 
    [Weight] FLOAT NOT NULL, 
    [HealthConditions] NVARCHAR(255) NOT NULL, 
    [PrimaryPhysician] NVARCHAR(255) NOT NULL, 
    [IsCaregiver] BIT NOT NULL, 	
)
