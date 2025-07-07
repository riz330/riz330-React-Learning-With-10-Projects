from telethon.sync import TelegramClient
import csv

# Replace these with your values
api_id = 29777513
api_hash = "35e93064fac76bed32767249f1cb43c8"

phone = '+919923732626'  # Your mobile number with country code

client = TelegramClient('session', api_id, api_hash)
client.connect()

if not client.is_user_authorized():
    client.send_code_request(phone)
    client.sign_in(phone, input('Enter the code sent to Telegram: '))

group = client.get_entity('https://t.me/militarism_gap_ir')

# example: 'mygroup123' or 'https://t.me/mygroup123'
participants = client.get_participants(group)

with open('group_members_with_phone.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['ID', 'Username', 'First Name', 'Last Name', 'Phone Number'])

    for user in participants:
        writer.writerow([
            user.id,
            user.username or '',
            user.first_name or '',
            user.last_name or '',
            user.phone or ''
        ])

print("✅ Done! File saved as group_members_with_phone.csv")
