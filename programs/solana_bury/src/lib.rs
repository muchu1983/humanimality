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
        ctx.accounts.tombstone_account.whose_tombstone = "Bennu".to_string();
        // let tombstone_account: &mut Account<Tombstone> = &mut ctx.accounts.tombstone_account;
        // tombstone_account.celebrant = *ctx.accounts.celebrant.key;
        // tombstone_account.whose_tombstone = whose_tombstone;
        msg!("bury {:?}", "Bennu");
        Ok(())
    }

    pub fn worship(ctx: Context<WorshipCtx>, whose_tombstone: String) -> Result<()> {
        // 祭拜指令
        ctx.accounts.blessings_account.whose_tombstone = "Bennu".to_string();
        // let blessings_account: &mut Account<Blessings> = &mut ctx.accounts.blessings_account;
        // blessings_account.worshipper = *ctx.accounts.worshipper.key;
        // blessings_account.whose_tombstone = whose_tombstone;
        msg!("worship {:?}", "Bennu");
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
        init_if_needed,
        seeds = [
            "solana_bury".as_bytes()
            // whose_tombstone.as_bytes(),
            // celebrant.key().as_ref()
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
#[instruction(whose_tombstone: String)]
pub struct WorshipCtx<'info> {
    //祭拜指令所需的參數account
    #[account(
        init_if_needed,
        seeds = [
            "solana_bury".as_bytes()
            // whose_tombstone.as_bytes(),
            // worshipper.key().as_ref()
        ],
        bump,
        payer = worshipper,
        space = 8 + Blessings::INIT_SPACE
    )]
    pub blessings_account: Account<'info, Blessings>,
    #[account(mut)]
    pub worshipper: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Tombstone {
    //墓碑區塊
    #[max_len(32)]
    pub whose_tombstone: String,
    // pub celebrant: Pubkey
}

#[account]
#[derive(InitSpace)]
pub struct Blessings {
    //祭拜祝詞區塊
    #[max_len(32)]
    pub whose_tombstone: String,
    // pub worshipper: Pubkey
}