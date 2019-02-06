CREATE TABLE [dbo].[Medication]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Din] INT NOT NULL, 
	[PersonId] INT NOT NULL, 
    [PrescriptionId] INT NULL, 
    [Name] NVARCHAR(255) NOT NULL, 
    [Strength] FLOAT NOT NULL, 
    [RemainingPills] FLOAT NOT NULL, 
	[PharmacyObtained] NVARCHAR(255) NOT NULL, 
    [Image] VARBINARY(255) NULL, 
    [TakeAsNeeded] BIT NOT NULL, 
    [SideEffects] NVARCHAR(255) NOT NULL,
	[DateObtained] DATETIME NOT NULL, 
)