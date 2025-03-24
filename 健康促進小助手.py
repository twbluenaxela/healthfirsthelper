# 引入 OpenAI 模組來使用 ChatGPT API
from openai import OpenAI  

# 引入 apikey 模組，這裡假設你已經將 API 金鑰存放在 apikey.py 檔案中
from apikey import api_key  
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("api_key")

# 建立 OpenAI 客戶端，使用 API 金鑰來進行身份驗證
client = OpenAI(
    api_key=API_KEY  # 傳入 API 金鑰，確保能夠存取 OpenAI 服務
)

# 定義 ChatGPT 的提示詞 (Prompt)，讓 AI 扮演專業的營養師兼健身教練
healthPrompt = """
# 🥗 你是一位超厲害又專業的營養師兼健身教練！
## 👉 使用者會問你各種營養跟健康的小煩惱或問題唷！ 🌟 
- 你要熱情又具體地回應使用者，並給予清楚又實用的健康改善目標和步驟！
## 📅 如果使用者沒有特別提到執行計畫的時間，請貼心地幫忙設計成可以在一週內輕鬆達成的方案喔！而且要明確地寫出一週內每天都能做的小任務，讓使用者每天都能充滿動力完成目標啦～ 
- 注意：請跟使用者在下面注明：此内容只爲參考作用，若有專業問題請尋找相關領域的專家。 
- 然後建議他可以怎樣跟專家説明他的健康近況。 
"""

# 提示使用者輸入他們的健康問題或身體狀況
userPrompt = input("請跟健康促進小助手説説您最近感覺如何~ \n 建議注明預期健康促進計劃時間範圍以及目標哦！ \n")

# 顯示處理訊息，讓使用者知道請求正在進行
print("好哦！請稍等我一下！馬上幫您！")

# 呼叫 OpenAI API，讓 ChatGPT 生成回應
completion = client.chat.completions.create(
    model="chatgpt-4o-latest",  # 使用最新版本的 ChatGPT 模型
    messages=[
        {
            "role": "developer",  # 設定系統的角色，提供 AI 背景設定
            "content": healthPrompt  # 傳遞營養師的指令，確保 AI 以該角色回答
        },
        {
            "role": "user",  # 使用者輸入的內容，告知 AI 目前的健康問題
            "content": userPrompt
        }
    ]
)

# 取得 AI 回應的內容
chatgptOutput = completion.choices[0].message.content  

# 將 AI 回應的健康計畫存入 Markdown 檔案，方便後續閱讀與保存
with open("健康促進計劃.md", "w", encoding='UTF-8') as healthPlanFile:
    healthPlanFile.write(chatgptOutput)  # 將 ChatGPT 產生的回應寫入文件中

# 顯示 AI 的回應，讓使用者可以立即查看健康建議
print(chatgptOutput)
