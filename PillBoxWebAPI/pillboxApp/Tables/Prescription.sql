CREATE TABLE [dbo].[Prescription]
(
	[Id] BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [PersonId] BIGINT NOT NULL, 
    [Rx] BIGINT NOT NULL, 
    [Doctor] NVARCHAR(255) NOT NULL, 
	[DateObtained] DATETIME NOT NULL, 
)
