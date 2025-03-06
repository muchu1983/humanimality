use anchor_lang::prelude::*;

declare_id!("4LxT6fYaWmQQyHf7XPcSZnX9AqQpx7Cg6wfjHPDnF8ds");

#[program]
pub mod solana_bury {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn bury(ctx: Context<BuryCtx>, whose_tombstone: String) -> Result<()> {
        // 埋葬指令
        let tombstone_account: &mut Account<Tombstone> = &mut ctx.accounts.tombstone_account;
        tombstone_account.celebrant = *ctx.accounts.celebrant.key;
        tombstone_account.whose_tombstone = whose_tombstone;
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
#[instruction(whose_tombstone: String)]
pub struct BuryCtx<'info> {
    //埋葬指令所需的參數account
    #[account(
        init,
        seeds = [
            "solana_bury".as_bytes(),
            whose_tombstone.as_bytes(),
            celebrant.key().as_ref()
        ],
        bump,
        payer = celebrant,
        space = 8 + Tombstone::INIT_SPACE
    )]
    pub tombstone_account: Account<'info, Tombstone>,
    #[account(mut)]
    pub celebrant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WorshipCtx {
    //祭拜指令所需的參數account
}

#[account]
#[derive(InitSpace)]
pub struct Tombstone {
    //墓碑區塊
    #[max_len(64)]
    pub whose_tombstone: String,
    pub celebrant: Pubkey
}

#[account]
#[derive(InitSpace)]
pub struct Blessings {
    //祭拜祝詞區塊
    #[max_len(64)]
    whose_tombstone: String,
}