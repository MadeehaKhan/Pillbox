CREATE TABLE [dbo].[Medication]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Din] BIGINT NOT NULL, 
	[PersonId] BIGINT NOT NULL, 
    [PrescriptionId] BIGINT NULL, 
    [Name] NVARCHAR(255) NOT NULL, 
    [Strength] FLOAT NOT NULL, 
    [RemainingPills] FLOAT NOT NULL, 
	[PharmacyObtained] NVARCHAR(255) NOT NULL, 
    [Image] VARBINARY(255) NULL, 
    [TakeAsNeeded] BIT NOT NULL, 
    [SideEffects] NVARCHAR(255) NOT NULL,
	[DateObtained] DATETIME NOT NULL, 
)