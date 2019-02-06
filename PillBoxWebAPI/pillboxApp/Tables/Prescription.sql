CREATE TABLE [dbo].[Prescription]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [PersonId] INT NOT NULL, 
    [MINC] INT NOT NULL, 
    [Doctor] NVARCHAR(255) NOT NULL, 
    [Instructions] NVARCHAR(255) NOT NULL, 
    [NumRefills] INT NOT NULL, 
    [Dosage] FLOAT NOT NULL, 
    [Name] NVARCHAR(255) NOT NULL, 
    [MedicationList] NVARCHAR(255) NOT NULL,
	[DateObtained] DATETIME NOT NULL, 
)
