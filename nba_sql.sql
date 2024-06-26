
IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'NBA')
BEGIN
    CREATE DATABASE [NBA]
END
GO

USE [NBA]
GO

/****** Object:  Table [dbo].[Teams]    Script Date: 5/26/2024 1:28:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbreviation] [varchar](255) NULL,
	[city] [varchar](255) NULL,
	[conference] [varchar](250) NULL,
	[division] [varchar](250) NULL,
	[full_name] [varchar](100) NULL,
	[name] [varchar](50) NULL,
	[score] [float] NUll,
 CONSTRAINT [PK__Teams__3213E83FABF45F00] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Teams] ON 
USE [NBA]
GO

-- Insert new rows with random float values for the score column
INSERT INTO [dbo].[Teams] ([id], [abbreviation], [city], [conference], [division], [full_name], [name], [score])
VALUES
    (2, N'ATL', N'Atlanta', N'East', N'Southeast', N'Atlanta Hawks', N'Hawks', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (3, N'BOS', N'Boston', N'East', N'Atlantic', N'Boston Celtics', N'Celtics', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (4, N'BKN', N'Brooklyn', N'East', N'Atlantic', N'Brooklyn Nets', N'Nets', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (5, N'CHA', N'Charlotte', N'East', N'Southeast', N'Charlotte Hornets', N'Hornets', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (6, N'CHI', N'Chicago', N'East', N'Central', N'Chicago Bulls', N'Bulls', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (7, N'CLE', N'Cleveland', N'East', N'Central', N'Cleveland Cavaliers', N'Cavaliers', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (8, N'DAL', N'Dallas', N'West', N'Southwest', N'Dallas Mavericks', N'Mavericks', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (9, N'DEN', N'Denver', N'West', N'Northwest', N'Denver Nuggets', N'Nuggets', 1 + (10 - 1) * RAND(CHECKSUM(NEWID()))),
    (10, N'DET', N'Detroit', N'East', N'Central', N'Detroit Pistons', N'Pistons', 1 + (10 - 1) * RAND(CHECKSUM(NEWID())))
GO
SET IDENTITY_INSERT [dbo].[Teams] OFF
GO
/****** Object:  StoredProcedure [dbo].[GetAllTeams]    Script Date: 5/26/2024 1:28:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllTeams]
AS
BEGIN
    SELECT id, abbreviation, city, conference, division, full_name, score, name FROM Teams;
END
GO
USE [NBA]
GO
ALTER DATABASE [NBA] SET  READ_WRITE 
GO
