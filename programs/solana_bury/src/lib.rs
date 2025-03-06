use anchor_lang::prelude::*;

declare_id!("4LxT6fYaWmQQyHf7XPcSZnX9AqQpx7Cg6wfjHPDnF8ds");

#[program]
pub mod solana_bury {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn bury(ctx: Context<BuryCtx>) -> Result<()> {
        // 埋葬指令
        Ok(())
    }

    pub fn worship(ctx: Context<WorshipCtx>) -> Result<()> {
        // 祭拜指令
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct BuryCtx {
    //埋葬指令所需的參數account
}

#[derive(Accounts)]
pub struct WorshipCtx {
    //祭拜指令所需的參數account
}

#[account]
pub struct Tombstone {
    //墓碑區塊
    tombstone_id: u8,
}

#[account]
pub struct Blessings {
    //祭拜祝詞區塊
    tombstone_id: u8,
}