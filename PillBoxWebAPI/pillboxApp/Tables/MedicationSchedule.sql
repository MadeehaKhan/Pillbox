CREATE TABLE [dbo].[MedicationSchedule]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [MedicationId] BIGINT NOT NULL, 
    [StartDate] DATETIME NOT NULL, 
    [RepeatNumber] INT NOT NULL, 
	[TimeFrame] NVARCHAR(255) NOT NULL,
    [RepeatOn] NVARCHAR(255) NOT NULL, 
)
