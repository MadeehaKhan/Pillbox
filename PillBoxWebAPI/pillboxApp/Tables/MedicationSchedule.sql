CREATE TABLE [dbo].[MedicationSchedule]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [MedicationId] INT NOT NULL, 
    [StartDate] DATETIME NOT NULL, 
    [RepeatNumber] INT NOT NULL, 
    [RepeatOn] NVARCHAR(255) NOT NULL
)
