import csv
import time
import random
from telethon.sync import TelegramClient
from telethon.tl.functions.messages import ImportChatInviteRequest
from telethon.errors import PeerFloodError, UserPrivacyRestrictedError, FloodWaitError
import re

# === TELEGRAM CREDENTIALS ===
api_id = 29777513
api_hash = '35e93064fac76bed32767249f1cb43c8'
phone = '+919923732626'

client = TelegramClient('session', api_id, api_hash)
client.connect()

if not client.is_user_authorized():
    client.send_code_request(phone)
    client.sign_in(phone, input('Enter the OTP sent to Telegram: '))

# === GROUP SCRAPE ===
invite_link = "https://t.me/POCO_F5_INDIA"

# Extract invite hash if needed
if "joinchat" in invite_link:
    invite_hash = invite_link.split('/')[-1]
    group = client(ImportChatInviteRequest(invite_hash))
else:
    group = client.get_entity(invite_link)

participants = client.get_participants(group)

# === SAVE TO CSV ===
csv_filename = 'safe_scraped_users.csv'

with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['ID', 'Username', 'First Name', 'Last Name', 'Phone Number'])

    for user in participants:
        writer.writerow([
            user.id,
            user.username or '',
            user.first_name or '',
            user.last_name or '',
            user.phone or ''
        ])

print(f"✅ Scraped and saved to {csv_filename}")

# === ROTATED MESSAGES ===
message_templates = [
    "Hi {first_name}, came across your profile and thought you might be interested in this small task — just 2 quick steps and you earn ₹150 instantly!\n\n"
    "✅ Step 1: Like this LinkedIn post: https://www.linkedin.com/posts/rizwan-khan-30915620a_django-webdevelopment-python-activity-7291749701022842880-ByYp\n"
    "✅ Step 2: Visit this Instagram: https://www.instagram.com/this_user_does_not_exist_12345/\n\n"
    "📸 Once done, send me the screenshots and I’ll send ₹150 your way. Let me know if you need help!",

    "Hey {first_name}, we're running a small task offer — complete two simple steps and get ₹150 straight. Super quick stuff!\n\n"
    "👉 1. Like this LinkedIn post: https://www.linkedin.com/posts/rizwan-khan-30915620a_django-webdevelopment-python-activity-7291749701022842880-ByYp\n"
    "👉 2. Visit this Instagram profile: https://www.instagram.com/this_user_does_not_exist_12345/\n\n"
    "📸 Just send screenshots here once done — payment is instant. Cheers!",

    "Hi {first_name}, want to earn ₹150 for just 2 simple steps? Takes less than 2 minutes.\n\n"
    "➡️ Like this LinkedIn post: https://www.linkedin.com/posts/rizwan-khan-30915620a_django-webdevelopment-python-activity-7291749701022842880-ByYp\n"
    "➡️ Visit this Instagram: https://www.instagram.com/this_user_does_not_exist_12345/\n\n"
    "📷 Send me screenshots after both steps, and your ₹150 will be sent right away!"
]


# === SEND DMs SAFELY ===
with open(csv_filename, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    users = [row for row in reader if row['Username']]

for idx, user in enumerate(users):
    username = user['Username']
    first_name = user['First Name'] or "there"
    message = random.choice(message_templates).format(first_name=first_name)

    try:
        print(f"[{idx+1}/{len(users)}] Sending to @{username}...")
        client.send_message(username, message)
        print("✅ Sent.")

        # Delay between messages (25–45 seconds)
        time.sleep(random.randint(25, 45))

    except PeerFloodError:
        print("🚫 Telegram thinks you're sending too many messages. Try again later.")
        break
    except FloodWaitError as e:
        print(f"⏳ Flood wait: sleeping for {e.seconds} seconds...")
        time.sleep(e.seconds)
        continue
    except UserPrivacyRestrictedError:
        print(f"❌ @{username} has privacy settings. Skipping.")
        continue
    except Exception as e:
        print(f"❌ Failed for @{username}: {e}")
        continue

print("🎉 Campaign completed safely.")
