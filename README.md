# ToDoApp

This project was generated with UI: ReactJS & Typescript, API: C# .NET 6, Database: MS SQL Server.

## Editors:
1. Used Visual Studio Code to develop UI application
2. Used Microsoft Visual Studio Community 2022 to develop API Service
3. Used Microsoft SQL Server Management Studio 18 to develop database

## Steps to setup UI Application:
1. Install latest Node.js: https://nodejs.org/en/
2. Install latest typescript : 
```bash
npm install -g typescript
```
3. Navigate to project folder
4. Install React:
 ```bash
npm i react
```
5. Restore the dependent packages: `npm install`
6. Command to Run: Run `npm start` for a dev server

## Steps to setup Backend API Application:
1. Install latest .NET 6.0
2. Install Dapper via Nuget Packages 
3. Install Microsoft.Data.SqlClient via Nuget Packages 
4. Install Microsoft.Extensions.Caching.Memory via Nuget Packages 
5. Install Swashbuckle.AspNetCore.Annotations via Nuget Packages 

## Steps to setup Database
1. Install SQL Server database
2. Create table using below script

```bash
USE [DBName]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ToDoItem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ItemName] [varchar](100) NULL,
	[Deadline] [date] NOT NULL,
	[IsDone] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_ToDoItem_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
```bash
