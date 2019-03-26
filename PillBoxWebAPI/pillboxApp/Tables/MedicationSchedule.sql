CREATE TABLE [dbo].[MedicationSchedule]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [MedicationId] BIGINT NOT NULL, 
	[Name] NVARCHAR(255) NOT NULL,
	[MedInfo] NVARCHAR(255) NOT NULL,
	[Every] NVARCHAR(255) NOT NULL,
	[Count] INT NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [Hour] INT NOT NULL, 
    [Minute] INT NOT NULL, 
)
