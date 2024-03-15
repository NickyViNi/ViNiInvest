from app.models import db, Analysis, environment, SCHEMA
from sqlalchemy.sql import text



def seed_analysis_stocks():
    analyses = [
        {
            "user_id": 1,
            "stock_id": 1,
            "content": "111 Apple is good. Apple is bad, but Apple is ok. However Apple is so so. Maybe it's excellent but I dont' know. But perhaps it's amazing.",
            "recommendation": "Sell"
        },
        {
            "user_id": 1,
            "stock_id": 1,
            "content": "Apple Inc. has been a dominant force in the technology sector for years, consistently innovating and delivering groundbreaking products. With the recent release of the iPhone 14, anticipation is high for another wave of strong sales. Additionally, Apple's expansion into services such as Apple Music and Apple TV+ provides a diverse revenue stream. However, concerns over supply chain disruptions and increasing competition from Android devices could impact future growth. Despite these challenges, Apple's strong brand loyalty and financial stability make it a compelling investment option. Therefore, I recommend buying Apple stock.",
            "recommendation": "Buy"
        },
        {
            "user_id": 2,
            "stock_id": 1,
            "content": "Apple Inc. continues to impress investors with its consistent growth and strong financial performance. The company's recent earnings report exceeded expectations, driven by robust sales of the latest iPhone models and steady growth in the services segment. Moreover, Apple's aggressive share buyback program signals confidence in its future prospects. However, concerns about potential regulatory scrutiny and slowing iPhone demand in key markets linger. Despite these risks, Apple's strong ecosystem and loyal customer base position it well for long-term success. Therefore, I recommend holding onto Apple stock for now.",
            "recommendation": "Hold"
        },
        {
            "user_id": 3,
            "stock_id": 1,
            "content": "Apple Inc. faces both opportunities and challenges in the current market landscape. On one hand, the company's expansion into wearables and services has diversified its revenue sources and reduced dependence on iPhone sales. Additionally, Apple's strong balance sheet and cash reserves provide ample room for investments and acquisitions. However, concerns about a potential slowdown in global smartphone sales and increasing competition from Chinese manufacturers pose risks to Apple's growth trajectory. Despite these headwinds, Apple's loyal customer base and brand strength remain unparalleled. Thus, I recommend holding Apple stock for now.",
            "recommendation": "Hold"
        },
        {
            "user_id": 4,
            "stock_id": 1,
            "content": "Apple Inc. stands at a crossroads as it navigates a rapidly changing tech landscape. The company's recent product launches, including the iPhone 14 and new MacBook models, have garnered positive reviews and strong consumer interest. Moreover, Apple's focus on sustainability and privacy resonates well with today's socially conscious consumers. However, concerns about supply chain disruptions and potential component shortages could impact future production and revenue. Despite these challenges, Apple's robust ecosystem and loyal customer base provide a solid foundation for continued growth. Therefore, I recommend buying Apple stock.",
            "recommendation": "Buy"
        },
        {
            "user_id": 5,
            "stock_id": 1,
            "content": "Apple Inc. remains a powerhouse in the technology sector, with its ecosystem of hardware, software, and services continuing to drive growth. The recent rollout of the Apple Car and advancements in augmented reality technology demonstrate the company's commitment to innovation. Additionally, Apple's strong financial position and cash reserves offer flexibility for strategic investments and acquisitions. However, concerns about antitrust scrutiny and potential regulatory challenges loom on the horizon. Despite these risks, Apple's loyal customer base and brand strength provide a competitive edge. Therefore, I recommend holding onto Apple stock for now.",
            "recommendation": "Hold"
        },
        {
            "user_id": 6,
            "stock_id": 1,
            "content": "Apple Inc. faces a mixed outlook as it grapples with both opportunities and threats in the market. On the positive side, the company's recent product launches, such as the iPhone 14 and Apple Watch Series 8, have generated excitement among consumers and investors alike. Moreover, Apple's robust services segment continues to deliver strong revenue growth, driven by subscriptions and digital content sales. However, concerns about supply chain disruptions and semiconductor shortages could impact production and sales in the near term. Despite these challenges, Apple's strong brand equity and loyal customer base position it well for long-term success. Therefore, I recommend holding Apple stock for now.",
            "recommendation": "Hold"
        },
        {
            "user_id": 7,
            "stock_id": 1,
            "content": "Apple Inc. remains a stalwart in the technology industry, with its ecosystem of products and services driving steady growth. The recent launch of the iPhone 14 and updates to the iPad and Mac lineup showcase Apple's commitment to innovation and user experience. Additionally, the continued expansion of Apple's services, including Apple Music and iCloud, provides a recurring revenue stream. However, concerns about potential regulatory challenges and increasing competition in key markets could weigh on future performance. Despite these risks, Apple's strong financial position and loyal customer base make it an attractive long-term investment. Therefore, I recommend buying Apple stock.",
            "recommendation": "Buy"
        },
        {
            "user_id": 8,
            "stock_id": 1,
            "content": "Apple Inc. faces both challenges and opportunities in the rapidly evolving technology landscape. On the positive side, the company's recent forays into augmented reality and autonomous vehicles hold promise for future growth. Moreover, Apple's strong brand loyalty and ecosystem of products and services provide a competitive advantage. However, concerns about market saturation and potential slowdowns in iPhone sales pose risks to Apple's revenue trajectory. Despite these challenges, Apple's robust balance sheet and focus on innovation make it a compelling long-term investment. Therefore, I recommend holding onto Apple stock for now.",
            "recommendation": "Hold"
        }
    ]

    [db.session.add(Analysis(**analysis)) for analysis in analyses]
    db.session.commit()


def undo_analysis_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.analyses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM analyses"))

    db.session.commit()
