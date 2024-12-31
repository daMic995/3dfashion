users = {'Items': [{'Last_Name': {'S': 'Targaryen'}, 'First_Name': {'S': 'Daenerys'}, 'ID': {'N': '2'}, 'Password': {'S': 'dnaerys'}, 'Email': {'S': 'dtarg@westeros.com'}}, 
                   {'Last_Name': {'S': 'Snow'}, 'First_Name': {'S': 'John'}, 'ID': {'N': '1'}, 'Password': {'S': 'jsnow'}, 'Email': {'S': 'jsnow@north.com'}}], 
                   'Count': 2, 'ScannedCount': 2, 'ResponseMetadata': {'RequestId': 'GBP8C5DM26QRASMCQ58T9D8R8FVV4KQNSO5AEMVJF66Q9ASUAAJG', 'HTTPStatusCode': 200, 
                                                                       'HTTPHeaders': {'server': 'Server', 'date': 'Tue, 31 Dec 2024 02:34:04 GMT', 'content-type': 
                                                                                       'application/x-amz-json-1.0', 'content-length': '302', 'connection': 'keep-alive', 
                                                                                       'x-amzn-requestid': 'GBP8C5DM26QRASMCQ58T9D8R8FVV4KQNSO5AEMVJF66Q9ASUAAJG', 'x-amz-crc32': '423908392'},
                                                                                         'RetryAttempts': 0}}

for user in users['Items']:
    if user['ID']['N'] == '3':
        user_info = {'first_name': user['First_Name']['S'], 'last_name': user['Last_Name']['S'], 'email': user['Email']['S']}

print(user_info)